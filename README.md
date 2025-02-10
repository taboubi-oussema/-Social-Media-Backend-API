# Social Media Backend API

This repository provides the backend API for a social media platform, built with Node.js, Express.js, and MongoDB. It supports essential social media features such as user registration, authentication, post creation, and interaction (likes/comments).

## Features
- **User Authentication**: Users can sign up, log in, and manage their sessions.
- **Posts Management**: Users can create, update, delete, and view posts.
- **Likes & Comments**: Users can interact with posts by liking and commenting.

## 🚀 Key Features

- RESTful API endpoints for Comments & Notifications
- Joi validation schema for data integrity
- MongoDB integration with Mongoose ODM
- Async error handling with express-async-handler
- Environment configuration with dotenv

## 📚 API Endpoints

### Comments
| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| GET    | /api/comments      | Get all comments           |
| POST   | /api/comments      | Create new comment         |
| GET    | /api/comments/:id  | Get comment by ID          |
| PUT    | /api/comments/:id  | Update comment             |
| DELETE | /api/comments/:id  | Delete comment             |

### Notifications
| Method | Endpoint               | Description                |
|--------|------------------------|----------------------------|
| GET    | /api/notifications     | Get all notifications      |
| POST   | /api/notifications     | Create new notification    |
| GET    | /api/notifications/:id | Get notification by ID     |
| PUT    | /api/notifications/:id | Update notification        |
| DELETE | /api/notifications/:id | Delete notification        |

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- Postman (for API testing)

### Installation

## ⚠️ Important Notes

1. Ensure MongoDB service is running locally
2. Complete missing route files (comment.route.js, notification.route.js)
3. Add proper error handling for database connection
4. Consider adding authentication middleware for production use

## 📜 License
This project is licensed under the MIT License.

---

**Built with:**  
🔹 Express.js  
🔹 MongoDB  
🔹 Joi Validation  
🔹 Mongoose ODM  
