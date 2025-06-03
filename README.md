# 📝 React Posts & Comments App

This project is a responsive blog-style application built with React that displays posts with user information and comment functionality. It fetches data from the JSONPlaceholder API and allows users to browse posts, view details, add favorites, and manage comments with local persistence.

## 🚀 Features

- ✅ View a list of posts with user avatars
- 🔍 Search posts by title with real-time results
- 📄 Detailed post view with author information
- ⭐ Favorite posts functionality with persistence
- ✍️ Add, edit, and delete comments (persisted via Zustand)
- 👤 User authentication (email-based)
- 📱 Responsive sidebar navigation
- ⚡ Optimized performance with skeleton loading states
- 🎨 Clean, responsive UI

## 🛠️ Tech Stack

- **React** – Core framework using functional components and hooks
- **React Router** – Navigation between views
- **Zustand** – State management with localStorage persistence for:
  - 🔐 Auth state (login/logout)
  - ⭐ Favorites system
  - 💬 Comments system
- **Axios** – HTTP client for API requests
- **Tailwind CSS** – Utility-first styling
- **React Icons** – Font Awesome icons
- **React Toastify** – Notification system

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Rufida123/Posts-List.git
cd Posts-List
code .
```

2. In the terminal:

```bash

npm run dev
Open your browser and visit: http://localhost:5173
```

# React Posts Application

## ✨ Features

### 🔐 Authentication System

- ✅ Email-based login with Zustand persistence
- 🔒 Protected routes for favorites and profile
- 💬 Toast notifications for login/logout

### ⭐ Favorites System

- 🔘 Toggle favorites with visual feedback
- 💾 Favorites persist per user
- 📂 Dedicated favorites page

### 💬 Comment System

- 📥 Fetch API comments for each post
- ✏️ Add/edit/delete local comments
- 👤 User-specific comment management
- 🎨 Rich text editing interface

### 📱 Responsive UI

- 📱 Mobile-friendly sidebar with toggle
- 🏗️ Responsive grid layouts
- � Adaptive card components
- 💀 Loading skeletons for better UX

## 🖼️ Screenshots

| Feature                      | Preview                                           |
| ---------------------------- | ------------------------------------------------- |
| 🏠 Home Page                 | ![Home Page](<./screenshots/Screenshot(1).png>)   |
| 📄✍️ Post Details & Comments | ![Post Detail](<./screenshots/Screenshot(3).png>) |
| ⭐ Favorites                 | ![Favorites](<./screenshots/Screenshot(2).png>)   |
| 👤 Profile                   | ![Profile](<./screenshots/Screenshot(4).png>)     |

## 📋 Notes

- � Uses mock data from JSONPlaceholder API
- 💾 All user data is persisted in localStorage
- 🔐 Authentication is simplified (email-only)
- ⚡ Favorite and comment systems demonstrate Zustand's persistence middleware
