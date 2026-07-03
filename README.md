# AZ Problem Tracker 🔖

A Chrome Extension that lets you bookmark practice problems on [maang.in](https://maang.in) with a single click — so you never lose track of a problem you want to revisit.

---

## 🧩 The Problem It Solves

If you've used maang.in for DSA practice, you know the struggle — you find an interesting problem, close the tab, and then spend 10 minutes hunting for it again later. There's no native bookmark or "save for later" feature on the platform.

**AZ Problem Tracker** solves this by injecting a bookmark button directly into the problem page. One click saves the problem name and URL. Open the extension popup anytime to see all your saved problems, jump back to them, or delete ones you're done with.

---

## ✨ Features

- 📌 **One-click bookmarking** — a bookmark icon is injected directly onto every problem page
- 💾 **Persistent storage** — bookmarks are saved via `chrome.storage.sync`, so they survive tab closes and browser restarts
- 🔁 **SPA-aware injection** — maang.in is a React SPA; the extension uses `MutationObserver` to detect page changes and inject the button at the right time
- 🪟 **Clean popup UI** — open the extension to see all saved problems in a tidy list
- ▶️ **Quick redirect** — click the play icon to jump straight back to the problem in a new tab
- 🗑️ **Delete bookmarks** — remove problems you're done with; storage and UI stay in sync instantly
- 🚫 **Duplicate prevention** — clicking bookmark on an already-saved problem does nothing

---

## 📁 Project Structure

```
Chrome-Extension-Problem-Tracker/
│
├── assets/
│   ├── bookmark.png       # Icon injected into problem pages
│   ├── play.png           # Redirect icon in popup
│   ├── delete.png         # Delete icon in popup
│   └── ext-icon.png       # Extension icon shown in Chrome toolbar
│
├── content.js             # Runs on maang.in pages — injects bookmark button, handles saving
├── popup.js               # Controls the popup UI — loads, displays, and manages bookmarks
├── popup.html             # HTML structure of the popup window
├── popup.css              # Styles for the popup
├── background.js          # Service worker (registered in manifest, reserved for future use)
├── manifest.json          # Extension configuration — permissions, scripts, icons, popup
└── README.md              # You are here
```

---

## 🔍 What Each File Does

### `manifest.json`
The brain of the extension. Declares:
- Manifest version 3
- Permissions: `storage` and `tabs`
- Which pages `content.js` runs on (`https://maang.in/*`)
- The popup HTML file
- Which assets are accessible to web pages (`web_accessible_resources`)

### `content.js`
This is the core script that runs directly on maang.in pages. It:
- Sets up a `MutationObserver` to watch for DOM changes (needed because maang.in uses React and routes change without full page reloads)
- Checks if the current URL is a `/problems/` route before doing anything
- Injects a bookmark icon (`bookmark.png`) before the problem title element using `insertAdjacentElement`
- On click, extracts the problem name from the DOM, the URL, and a unique ID from the URL path
- Checks for duplicates before saving
- Saves the bookmark object `{ id, name, url }` to `chrome.storage.sync`

### `popup.js`
Controls everything inside the popup window. It:
- On `DOMContentLoaded`, fetches all bookmarks from `chrome.storage.sync`
- Renders each bookmark as a card with a title, play button, and delete button
- Play button reads the stored URL and opens it in a new tab
- Delete button removes the card from the DOM and deletes it from storage
- Shows a friendly "No Bookmarks to Show" message when the list is empty

### `popup.html`
Simple HTML shell for the popup — a container div, a title, and a `#bookmarks` div that `popup.js` populates dynamically.

### `popup.css`
Styles the popup to be compact (280px wide), readable, and clean. Each bookmark card has a bottom border, and control icons are sized and spaced neatly.

### `background.js`
Registered as the service worker in `manifest.json`. Currently empty — kept for future use (e.g. handling extension install events, badge updates, or cross-tab messaging).

### `assets/`
All image files used by the extension. These are loaded via `chrome.runtime.getURL()` rather than direct paths, because the browser needs the full `chrome-extension://...` URL to find files bundled inside an extension when they are injected into an external webpage.

---

## 🛠️ How to Install Locally

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer Mode** (toggle in the top right)
4. Click **Load unpacked**
5. Select the project folder
6. The extension icon will appear in your Chrome toolbar

---

## 🚀 How to Use

1. Go to any problem page on [maang.in](https://maang.in) — URL should contain `/problems/`
2. You'll see a small bookmark icon appear near the problem title
3. Click it to save the problem
4. Click the extension icon in the Chrome toolbar to open the popup
5. See all your saved problems
6. Click ▶️ to open a problem in a new tab
7. Click 🗑️ to delete a bookmark

---

## ⚡ Planned Enhancements

These are features that would make the extension significantly more powerful:

### 🏷️ Problem Tags & Difficulty Labels
Right now only the name and URL are saved. Scraping and storing the difficulty level (Easy / Medium / Hard) and topic tags (Array, DP, Graph etc.) would make the bookmark list much more useful for structured revision.

### 🔍 Search & Filter in Popup
As bookmarks grow, finding a specific problem becomes harder. A search bar and filter by topic/difficulty would solve this instantly.

### ✅ Solved / Unsolved Status
Let users mark problems as solved directly in the popup. Visual distinction (strikethrough, green tick) between solved and unsolved problems.

### 📂 Custom Collections / Folders
Group bookmarks into named folders like "DP Problems", "Interview Prep", "Weekly Revision" etc. Similar to how browser bookmarks work with folders.

### 📤 Export Bookmarks
Export all saved problems as a CSV or JSON file — useful for backup or sharing your problem list with friends.

### 🔄 Sync Across Devices
`chrome.storage.sync` already syncs across devices if you're logged into Chrome — but adding a visual indicator confirming sync status would improve the UX.

### 🎨 Dark Mode Popup
A dark theme for the popup to match maang.in's own dark UI.

### 📊 Progress Tracker
Track how many problems you've bookmarked vs solved, visualised as a simple progress bar in the popup.

---

## 🔧 Known Limitations

- Only works on `maang.in` — the content script is scoped to that domain in `manifest.json`
- `chrome.storage.sync` has a storage quota (~100KB total, 8KB per item) — not a concern for typical use but worth noting
- If maang.in updates their CSS class names (which are Tailwind-generated), the DOM selectors used to find the problem title element may break and need updating

---

## 🤝 Contributing

Feel free to fork, open issues, or submit pull requests. If you use maang.in for practice and have ideas for features, open an issue and let's talk.

---

<br>

<p align="center">Made with ❤️ by Ashutosh Ranjan</p>