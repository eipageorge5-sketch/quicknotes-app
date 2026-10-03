# QuickNotes App

QuickNotes is a lightweight, responsive note-taking web application designed to help users capture, organize, and manage their daily tasks and thoughts. Built with vanilla HTML, CSS, and JavaScript, it provides a clean interface for adding notes with specific categories, searching through them instantly, and persisting data locally so nothing is lost on page refresh.

## Features
- **Add Notes:** Create notes with text and assign them to Personal, Work, or Study categories.
- **Validation:** Prevents empty submissions and enforces a 200-character limit with clear error messages.
- **Search:** Real-time filtering of notes as you type.
- **Data Persistence:** All notes are saved to the browser's `localStorage`, surviving page reloads.
- **Responsive Design:** Fully functional and visually appealing on both desktop and mobile devices.

## How to Run Locally
1. Clone this repository to your local machine.
2. Open the folder in Visual Studio Code.
3. Install the "Live Server" extension.
4. Right-click `index.html` and select "Open with Live Server".

## What I Learned
1. **DOM Manipulation:** How to safely create and append HTML elements using `document.createElement` and `textContent` instead of `innerHTML` to prevent security vulnerabilities.
2. **Local Storage:** How to use `JSON.stringify` and `JSON.parse` to save and retrieve complex array data in the browser.
3. **Event Handling:** How to manage form submissions, input events for real-time search, and dynamic UI updates.
