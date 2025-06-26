# 📝 React Blog Application with Advanced Features

This project is a full-featured blog application built with React that allows users to create, edit, and manage posts with comments and favorites. It features user authentication, local data persistence, and integrates with the JSONPlaceholder API for initial data.

## 🚀 Features

### 🏠 Core Functionality

- ✅ View a list of posts with user avatars and categories
- 🔍 Search and filter posts by title, author, or category
- 📄 Detailed post view with author information and comments
- ⭐ Favorite posts functionality with user-specific persistence
- ✍️ Add, edit, reply to, and delete comments with local persistence
- 👤 User authentication (email-based) with protected routes
- 🌓 Dark mode toggle

### 🛡️ Admin Features

- 👮 Admin panel for user management
- ⚠️ Report system for posts and comments
- 🔒 Block/unblock users
- 👑 Grant/revoke admin privileges
- 📊 System statistics and user overview

### ✨ Advanced Features

- 📝 **Post Management**
  - Create new posts with categories
  - Edit existing posts (creator-only)
  - Report inappropriate posts
  - Delete posts (admin-only)
- 💬 **Enhanced Comment System**

  - Nested replies with threading
  - Like/dislike functionality
  - Report inappropriate comments
  - Edit/delete own comments
  - Notification system for replies and reactions

- 🔔 **Notification System**

  - Real-time notifications for replies and reactions
  - Mark as read functionality
  - Clear all notifications

- 🛠️ **Technical Features**
  - Zustand state management with persistence
  - React Query for data fetching
  - Toast notifications
  - Loading skeletons
  - Responsive design

## 🛠️ Tech Stack

- **React** – Core framework using functional components and hooks
- **React Router** – Navigation between views
- **Zustand** – State management with localStorage persistence
- **React Query** – Data fetching and caching
- **Axios** – HTTP client for API requests
- **Tailwind CSS** – Utility-first styling
- **React Icons** – Icon library
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
```

3.Open your browser and visit: http://localhost:5173.

## Demo Accounts

- **Admin**: `admin@gmail.com`
- **Regular user**: Any email works (system creates account on first login)

## 🖼️ Screenshots

| Feature                    | Preview URL                                        |
| -------------------------- | -------------------------------------------------- |
| 🏠 Home Page               | [Home Page](<./screenshots/Screenshot(1).png>)     |
| 📄 Post Details & Comments | [Post Detail](<./screenshots/Screenshot(3).png>)   |
| ✏️ Create/Edit Post        | [Post Editor](<./screenshots/Screenshot(5).png>)   |
| ⭐ Favorites               | [Favorites](<./screenshots/Screenshot(2).png>)     |
| 👤 Profile                 | [Profile](<./screenshots/Screenshot(6).png>)       |
| 👮 Admin Panel             | [Admin](<./screenshots/Screenshot(8).png>)         |
| 🔔 Notifications           | [Notifications](<./screenshots/Screenshot(9).png>) |

## 📋 Notes

- 🌐 Uses mock data from JSONPlaceholder API as base content
- 💾 All user data is persisted in localStorage
- 🔐 Simplified email-only authentication (no password required)
- ⚡ Zustand persistence for:
  - Authentication state
  - Favorites
  - Comments
  - Notifications
  - Reports
- 🛠️ React Query for efficient data fetching and caching
- 📱 Fully responsive design for all device sizes
- 🎨 Tailwind CSS for utility-first styling
- 🔄 Real-time updates without page refresh
