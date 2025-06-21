# 📝 React Blog Application with Advanced Features

This project is a full-featured blog application built with React that allows users to create, edit, and manage posts with comments and favorites. It features user authentication, local data persistence, and integrates with the JSONPlaceholder API for initial data.

## 🚀 Features

### 🏠 Core Functionality

- ✅ View a list of posts with user avatars and categories
- 🔍 Search posts by title with real-time results
- 📄 Detailed post view with author information and comments
- ⭐ Favorite posts functionality with user-specific persistence
- ✍️ Add, edit, and delete comments with local persistence
- 👤 User authentication (email-based) with protected routes

### ✨ Advanced Features

- 📝 **Post Management**
  - Create new posts with categories and authors
  - Edit existing posts (creator-only)
  - View all posts created by the current user
- 📊 **User Profile Dashboard**
  - View statistics (posts, comments, favorites)
  - Interactive chart showing post distribution by category
  - Secure logout functionality
- 💬 **Enhanced Comment System**
  - Rich text editing interface
  - User-specific comment management
  - Distinction between API and local comments
- 🎨 **UI Improvements**
  - Responsive sidebar with toggle functionality
  - Loading skeletons for better UX
  - Toast notifications for user feedback
  - Dark mode support

## 🛠️ Tech Stack

- **React** – Core framework using functional components and hooks
- **React Router** – Navigation between views
- **Zustand** – State management with localStorage persistence for:
  - 🔐 Auth state (login/logout)
  - ⭐ Favorites system
  - 💬 Comments system
- **React Query** – Data fetching and caching
- **Axios** – HTTP client for API requests
- **Tailwind CSS** – Utility-first styling
- **React Icons** – Font Awesome icons
- **React Toastify** – Notification system
- **Recharts** – Data visualization for user statistics

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

# React Blog Application

## ✨ Features

### 🔐 Authentication System

- ✅ Email-based login with Zustand persistence
- 🔒 Protected routes for favorites, profile, and post management
- 💬 Toast notifications for all auth actions
- 🚪 Conditional UI based on authentication state

### 📝 Post Management System

- ➕ Create new posts with categories and authors
- ✏️ Edit existing posts (creator-only access)
- 🗑️ Automatic validation for post creation/editing
- 📊 View all posts created by current user
- 🏷️ Category-based organization (Technology, Travel, Food, etc.)

### ⭐ Favorites System

- 🔘 Toggle favorites with visual feedback
- 💾 User-specific favorites persistence
- 📂 Dedicated favorites page
- 🔍 Favorites integrated with search functionality

### 💬 Enhanced Comment System

- 📥 Fetch API comments for each post
- ✏️ Add/edit/delete local comments
- 👤 User-specific comment management
- 🏷️ Visual distinction between API and user comments
- 🎨 Rich text editing interface
- 🚫 Comment moderation (users can only manage their own comments)

### 👤 User Profile Dashboard

- 📊 Interactive statistics (posts, comments, favorites)
- 📈 Recharts visualization of post categories
- 🔢 Counters for all user activities
- 🚪 Secure logout functionality

### 📱 Responsive UI

- 🍔 Mobile-friendly sidebar with toggle
- 🏗️ Responsive grid layouts for all views
- 💀 Loading skeletons for better UX
- 🎨 Adaptive card components
- 🌓 Dark mode support
- 📱 Full mobile responsiveness

## 🖼️ Screenshots

| Feature                    | Preview                                           |
| -------------------------- | ------------------------------------------------- |
| 🏠 Home Page               | ![Home Page](<./screenshots/Screenshot(1).png>)   |
| 📄 Post Details & Comments | ![Post Detail](<./screenshots/Screenshot(3).png>) |
| ✏️ Create/Edit Post        | ![Post Editor](<./screenshots/Screenshot(5).png>) |
| ⭐ Favorites               | ![Favorites](<./screenshots/Screenshot(2).png>)   |
| 👤 Profile Dashboard       | ![Profile](<./screenshots/Screenshot(6).png>)     |
| 📊 Category Visualization  | ![Stats](<./screenshots/Screenshot(7).png>)       |

## 📋 Notes

- 🌐 Uses mock data from JSONPlaceholder API as base content
- 💾 All user data is persisted in localStorage
- 🔐 Simplified email-only authentication for demo purposes
- ⚡ Zustand persistence for favorites, comments, and auth state
- 🛠️ React Query for efficient data fetching and caching
- 📱 Fully responsive design for all device sizes
- 🎨 Tailwind CSS for utility-first styling
