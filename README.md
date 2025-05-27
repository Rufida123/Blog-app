# 📝 React Posts & Comments App

This project is a responsive blog-style application built with **React** that displays posts with user information and comment functionality. It fetches data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) and allows users to browse posts, view details, and add/edit/delete comments with local persistence.

---

## 🚀 Features

- ✅ View a list of posts with user avatars
- 🔍 Search posts by title with real-time results
- 📄 Detailed post view with author information
- ✍️ Add, edit, and delete comments (persisted via Zustand)
- ⚡ Optimized performance with skeleton loading states
- 🎨 Clean, responsive UI with a purple/amber color scheme

---

## 📷 Screenshots

### 🏠 Home Page - Posts List

![Home Page Screenshot](./screenshots//Screenshot(1).png)

- Posts are fetched from JSONPlaceholder API
- Each card shows author avatar, post title, and preview
- Search functionality filters posts by title

---

### 📄 Post Details Page

![Post Detail Screenshot](./screenshots/Screenshot(2).png)
![Post Detail Screenshot](./screenshots/Screenshot(3).png)

- Displays full post content with rich formatting
- Shows detailed author information (contact, address, company)
- Comment section with user avatars and timestamps

---

### ✍️ Comment Functionality

![Comment Screenshot](./screenshots/Screenshot(4).png)
![Comment Screenshot](./screenshots/Screenshot(5).png)

- Add new comments with name, email, and body
- Edit/delete locally-added comments
- Comments persist via Zustand with localStorage

---

## 🛠️ Tech Stack

- **React** – Core framework using functional components and hooks
- **React Router** – Navigation between posts list and detail views
- **Context API** – Manages global state for:
  - 📜 **Posts Context**: Provides fetched posts and user data
  - 🔍 **Search Context**: Handles post filtering logic
- **Zustand** – State management for comments with localStorage persistence
- **Axios** – HTTP client for API requests
- **Tailwind CSS** – Utility-first styling for responsive design

---
## 🔧 Key Implementation Details

### 📜 Posts Fetching
- Uses `Promise.all` to fetch posts and users simultaneously
- Implements loading states with skeleton UI
- Efficiently matches users to posts using context

### 🔍 Search Functionality
- Debounced search input with keyboard support
- Click-outside detection to clear results
- Preserves original data when search is cleared

### 💬 Comment System
- Merges API comments with locally-added ones
- Generates unique IDs for local comments
- Full CRUD operations with optimistic UI updates
- Persists data using Zustand's localStorage middleware

### 🎨 UI Highlights
- Responsive grid layout that adapts to screen size
- Consistent purple/amber color scheme
- Interactive hover states and transitions
- Accessible form controls with proper labeling

---

## 📝 Notes

- This project uses mock data from JSONPlaceholder
- All comments with IDs > 100,000 are locally added and can be edited/deleted
- The app demonstrates clean state management patterns using both Context API and Zustand