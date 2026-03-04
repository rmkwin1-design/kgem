content = open('d:/backup/research_automation/korea_travel_curator/src/data/spots/seoul.ts', encoding='utf-8').read()
pos = content.find('"id": "seoul-attr-1"')
print('id pos:', pos)
if pos != -1:
    print('chunk around id:')
    print(repr(content[pos:pos+200]))
    img_pos = content.find('"image"', pos)
    print('image field pos:', img_pos, '(relative to id:', img_pos - pos, ')')
    close_brace = content.find('}', pos)
    print('first close_brace pos:', close_brace, '(relative to id:', close_brace - pos, ')')
    # Is image before close brace?
    print('image before close_brace?', img_pos < close_brace)
