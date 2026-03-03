# UI/UX Error and Bug Log

This document records resolved UI bugs and errors for future reference.

## 1. Search Icon Rendering Glitch (SEARCH text overlay)

- **Problem**: The search input displayed a huge "SEARCH" text over the input field instead of a magnifying glass icon on both desktop and mobile.
- **Root Cause**: The Material Symbols font failed to load or subset correctly with the `icon_names` parameter, causing the browser to render the fallback text node.
- **Solution**: Completely removed the dependency on `material-symbols-outlined` for the search icon and replaced it with a direct inline SVG. This guarantees the icon always renders correctly regardless of font loading network issues.

## 2. Sticky Header and Category Scroll Issue

- **Problem**: The search bar and category filters would scroll out of view (disappear upwards) instead of remaining sticking to the top of the screeen.
- **Root Cause**: The `<main>` tag had an `overflow-x-hidden` utility class. In CSS, any `overflow` property other than `visible` on a parent element breaks `position: sticky` for its children.
- **Solution**: Removed `overflow-x-hidden` from the main flex container in `page.tsx` allowing the `sticky top-24` classes on the search bar and category bar to function correctly.

## 3. Category Filtering Mismatch (No locations for Attractions/Experiences/Cafe)

- **Problem**: Clicking on categories like "명소" (Attractions), "체험" (Experiences), and "디저트/카페" (Dessert/Cafe) resulted in no places being shown.
- **Root Cause**: There was a mismatch between the UI keys used in `page.tsx` state (`attraction`, `experience`, `cafe`) and the actual category values stored in the spot objects from the data files (`travel`, `activity`, `dessert`).
- **Solution**: Implemented a `categoryMap` object in the filtering `useMemo` of `page.tsx` to automatically map the UI keys to their corresponding data keys before running the `.filter()` function.

## 4. Disappearing "Scroll to Top" Button

- **Problem**: The floating "arrow up" button to quickly scroll to the top of the page disappeared and stopped working.
- **Root Cause**: The application layout uses a fixed `<body>` and an internal `#app-clip` container with `overflow-y: auto`. The scroll to top button was listening to `window.addEventListener('scroll')` and checking `window.scrollY`. Since the window itself wasn't scrolling, `scrollY` remained at 0 and the button never appeared.
- **Solution**: Updated the `handleScroll` event listener and `scrollToTop` function to target the `document.getElementById('app-clip')` element instead of `window`, checking `scrollContainer.scrollTop` to toggle visibility and performing smooth scrolling on the container.
