import json
import re
import os
import urllib.request
import urllib.parse
import subprocess

def get_old_image(spot_id, file_path):
    try:
        out = subprocess.check_output(['git', 'show', f'HEAD~1:{file_path}']).decode('utf-8')
        m = re.search(r'"id":\s*"' + spot_id + r'".*?"image":\s*"([^"]+)"', out, flags=re.DOTALL)
        if m:
            return m.group(1)
    except Exception as e:
        print("Error getting old image for", spot_id, e)
    return None

def fetch_wiki_image(search_query):
    # Try exact match
    q = urllib.parse.quote(search_query)
    url = f"https://ko.wikipedia.org/w/api.php?action=query&prop=pageimages&titles={q}&format=json&pithumbsize=800"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        resp = urllib.request.urlopen(req)
        data = json.loads(resp.read())
        pages = data.get('query', {}).get('pages', {})
        for pid, pdata in pages.items():
            if 'thumbnail' in pdata:
                return pdata['thumbnail']['source']
    except Exception:
        pass
        
    # Try search
    url2 = f"https://ko.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={q}&gsrlimit=1&prop=pageimages&format=json&pithumbsize=800"
    req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        resp = urllib.request.urlopen(req2)
        data = json.loads(resp.read())
        pages = data.get('query', {}).get('pages', {})
        for pid, pdata in pages.items():
            if 'thumbnail' in pdata:
                return pdata['thumbnail']['source']
    except Exception:
        pass
    return None

def process_file(relative_path):
    print(f"\\nProcessing {relative_path}...")
    abs_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), relative_path)
    
    with open(abs_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all objects using bracket depth or simple regex:
    # Since each object starts with { "id": "...", we can split by '{ "id": '
    parts = content.split('{ "id": "')
    out_content = parts[0]
    
    for part in parts[1:]:
        # spot_id is up to the next quote
        spot_id = part.split('"', 1)[0]
        
        q_m = re.search(r'"query":\s*\{\s*"ko":\s*"([^"]+)"', part)
        query_ko = q_m.group(1) if q_m else ""
        
        cat_m = re.search(r'"category":\s*"([^"]+)"', part)
        category = cat_m.group(1) if cat_m else ""
        
        # Determine image
        wiki_url = None
        if category in ['travel', 'attraction', 'activity', 'film']:
            wiki_url = fetch_wiki_image(query_ko)
            
        final_url = wiki_url
        if not final_url:
            old_url = get_old_image(spot_id, relative_path)
            if old_url:
                final_url = old_url
                
        if not final_url:
            final_url = "https://images.unsplash.com/photo-1540959733332-e9ab6542fb48?w=800&q=80"
            
        # Replace image URL in this part
        new_part = re.sub(r'"image":\s*"[^"]+"', f'"image": "{final_url}"', part, count=1)
        
        out_content += '{ "id": "' + new_part
        
        source = "WIKI" if wiki_url else "HEAD~1"
        print(f"[{source}] {query_ko} ({spot_id}) -> {final_url}")

    with open(abs_path, 'w', encoding='utf-8') as f:
        f.write(out_content)

if __name__ == '__main__':
    process_file('src/data/spots/seoul.ts')
    process_file('src/data/spots/busan.ts')
    process_file('src/data/spots/jeju.ts')
    print("DONE!")
