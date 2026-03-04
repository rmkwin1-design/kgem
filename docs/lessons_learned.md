# K-Gem Development Lessons Learned (2026-03-04)

## 🚨 Critical Failures & Mistakes

### 1. Deployment vs. Local Environment Mismatch

- **Issue**: Spent significant time debugging why "search still fails" when the fixes were already verified locally.
- **Mistake**: Did not confirm the URL the user was testing. The user was testing on `kgem.vercel.app` (stale deployment) while I was working on local files.
- **Prevention**: ALWAYS ask for the testing URL first. Use a sync-verification alert/string to confirm the version running in the user's browser.

### 2. Search Results Gated for Guests

- **Issue**: Search results were returning data from the API but not showing in the UI for unauthenticated users.
- **Mistake**: Conditional rendering logic in `page.tsx` was written as `user ? <Results /> : <LoginGate />`.
- **Prevention**: Decouple core features (like search) from authentication. Only gate specific "Premium" details, not the entire result list.

### 3. State Conflict in Filter Reset

- **Issue**: Search results were intermittently disappearing or clearing.
- **Mistake**: A `useEffect` was clearing `searchQuery` every time `activeCategory` changed. This was too aggressive and led to poor UX and lost results.
- **Prevention**: Use more granular state resets. Avoid side-effects that "nuke" user input unless explicitly requested.

### 4. Vague AI Prompts

- **Issue**: AI search for specific regions (e.g., "Ansan") was returning generic Korean result sets.
- **Mistake**: The prompt didn't strictly enforce regional boundaries or specific Korean language nuances.
- **Prevention**: Use "Deep-Location Intelligence" instructions in prompts. Explicitly require region matching and localized terminology.

### 5. Live-Site 500 Error (Confirmed: Missing API Key on Vercel)

- **Issue**: After pushing fixes, the live site returned "Search service is currently unavailable".
- **Root Cause**: The `OPENAI_API_KEY` was missing from the Vercel dashboard environment variables. This was caught by my diagnostic logic.
- **Mistake**: Did not explicitly check or remind the user to configure API keys on the hosting provider (Vercel) after making code changes.
- **Prevention**: Include a "Deployment Checklist" that covers Environment Variable synchronization between local and production.

### 6. Vercel Project Naming Confusion

- **Issue**: Instructed the user to add the API key to the `korea_travel_curator` project, but the active site (`kgem.vercel.app`) was linked to a different project named `kgem`.
- **Mistake**: Assumed the Vercel project name would match the local folder name (`korea_travel_curator`).

### 7. Result-Clearing Logic Bug (Regression)

- **Issue**: Search started returning 0 results for regions with "enough" data.
- **Mistake**: Introduced a logic branch `if (localMatches.length < 20) { fetch(...) } else { setLiveSpots([]) }`. If local matches were >= 20, I was clearing the results instead of displaying them.
- **Prevention**: ALWAYS test both branches of a conditional (the 'if' and the 'else') especially when dealing with data display.

### 8. The "Invisible Build" (Synchronization Paradox)

- **Issue**: Applied fixes repeatedly but the user's UI didn't change (e.g., missing red background).
- **Mistake**: Relied on Vercel "Building" status or local successful push. If the build fails silently or the user has a cached version, the "Production" site remains stale.
- **Prevention**: Use a **Build Version Tag** in the footer or a high-priority `alert()` on load to verify the exact build being served.

## 🛠️ Improved Workflow for Future Tasks

1. **Verify Environment**: Check if working on `localhost` or a deployed site.
2. **Sync Check**: If UI doesn't match code, force a visible change (color, alert) to confirm HMR (Hot Module Replacement) or deployment status.
3. **Log Everything**: Add `[Diagnostic]` tags to console logs on both frontend and backend immediately when a persistent issue is reported.
4. **Push Early/Often**: When the user is testing the live site, push fixes to Git immediately after local verification to trigger CI/CD.

## 📝 General Note

## 🛡️ Permanent Workflow Rule

- **Every mistake, failure, or error encountered during development must be documented in this file immediately.**
- **Before starting any new task, this file must be reviewed to prevent regression.**
