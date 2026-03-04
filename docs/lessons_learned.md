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

### 5. Live-Site 500 Error (Post-Deployment)

- **Issue**: After pushing fixes, the live site returns Status 500 for search.
- **Mistake**: Did not verify if OpenAI API Key was correctly configured in the Vercel dashboard environment variables, and the diagnostic alert didn't show the error details.
- **Prevention**: Include response body in error alerts during the debugging phase. Provide a clear "Missing API Key" message if applicable.

## 🛠️ Improved Workflow for Future Tasks

1. **Verify Environment**: Check if working on `localhost` or a deployed site.
2. **Sync Check**: If UI doesn't match code, force a visible change (color, alert) to confirm HMR (Hot Module Replacement) or deployment status.
3. **Log Everything**: Add `[Diagnostic]` tags to console logs on both frontend and backend immediately when a persistent issue is reported.
4. **Push Early/Often**: When the user is testing the live site, push fixes to Git immediately after local verification to trigger CI/CD.

## 📝 General Note

## 🛡️ Permanent Workflow Rule

- **Every mistake, failure, or error encountered during development must be documented in this file immediately.**
- **Before starting any new task, this file must be reviewed to prevent regression.**
