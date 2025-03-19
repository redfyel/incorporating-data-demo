# 📦 Incorporating Data Demo

Welcome to **Incorporating Data Demo**! 🚀 This project demonstrates various data-handling techniques in a React application, backed by a Node.js & Express server.

## 📌 Features
- **Requesting Data** – Fetch data from an API
- **Sending Data** – Submit data using POST requests
- **Uploading Files** – Upload and preview images
- **Authorized Requests** – Fetch protected data using tokens
- **Saving Data Locally** – Store data using LocalStorage
- **Handling Promise States** – Display loading, success, and error states

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/incorp-data-demo.git
   cd incorp-data-demo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the backend server**:
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:5000`

4. **Start the React app**:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:5173`

## 🔥 API Endpoints (Backend)
| Method | Endpoint         | Description |
|--------|----------------|-------------|
| GET    | /coffees       | Fetch coffee types |
| POST   | /order         | Place an order |
| POST   | /upload        | Upload an image |
| GET    | /vip-orders    | Fetch VIP orders (Requires token) |
| POST   | /save-favorite | Save favorite coffee |

## 🖼️ Uploading Images
The app allows users to upload images, which are previewed immediately upon selection.

## 🔑 Authorization
For **VIP orders**, use the token:
```plaintext
secret-shelian-token
```
---
Enjoy working with **Incorporating Data Demo**! 🚀🎉

