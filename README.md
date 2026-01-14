# 📦 StockSync | Inventory Management System

📦 StockSync is a **MERN-based** Inventory Management System designed to help businesses efficiently manage **products** 🛒, **categories** 🗂️, **suppliers** 🚚, and **stock levels** 📊.
The system provides **real-time inventory tracking** ⏱️, **low-stock alerts** ⚠️, and **CRUD operations** ✏️🗑️ with secure **JWT authentication** 🔐. Built with a focus on **Role-Based Access Control (RBAC)** and **data integrity**.

---

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![Author](https://img.shields.io/badge/Author-Sandeep%20Mukku-orange.svg)

---

## 📚 Table of Contents

- [🧰 Tech Stack](#-tech-stack)
- [✨ Features](#-features)
- [🎨 UI Highlights](#-ui-highlights)
- [🖼️ Screenshots](#-screenshots)
- [📦 Installation & Setup](#-installation--setup)
- [🚀 Usage](#-usage)
- [🏗 App Structure](#-app-structure)
- [🗂 Key Files](#-key-files)
- [🧩 Core Functionality](#-core-functionality)
- [🔐 Security & Rules](#-security--rules)
- [🧱 System Architecture](#-system-architecture)
- [🔗 Database Schema & Relationships](#-database-schema--relationships)
- [📈 Future Enhancements](#-future-enhancements)
- [❤️ Built With Love](#-built-with-love)

---

## 🧰 Tech Stack

### 🖥️ Frontend

- ⚡ **React 19 (Vite)** – Used for building a fast and interactive user interface.  
- 🎨 **Material-UI (MUI)** – Provides ready-made components for a clean and consistent design.  
- 🛣️ **React Router DOM (v7)** – Handles page navigation smoothly across the app.  
- 📡 **Axios** – Used to communicate with the backend APIs.  
- 🔔 **React Toastify** – Shows real-time notifications for user actions.
- 📊 **Recharts** - D3-based charting library for React.

### ⚙️ Backend

- 🟢 **Node.js** – Javascript runtime environment which runs the server-side code and handles requests.  
- 🚀 **Express** – Lightweight framework for building RESTful APIs.  
- 🍃 **MongoDB & Mongoose (ODM)** – Stores app data and provides schema-based data modeling.  
- 🔑 **JWT (JSON Web Token)** – Secure, stateless authentication for user sessions.  
- 🛡️ **Bcryptjs** – Hashes passwords for secure user authentication.

---

## ✨ Features

- 🔐 **Role-Based Access Control (RBAC)** - Distinct interfaces for **Admins** (Full Control) and **Staff** (Restricted View).
- 📊 **Live Stock Tracking** - Real-time calculation of **In Stock**, **Low Stock**, and **Out of Stock** statuses.
- 🚚 **Supplier Management** - Complete supplier CRM with **cascade deletion logic** (removing a supplier also deletes linked products).
- 👥 **User Management** - Admins can **create, promote, or deactivate** staff accounts.
- 🔍 **Centralized Search & Filters** - Quick filtering by **category**, **supplier** and **stock status**.

- 🔐 **Authentication**: **JWT-secured** login (Admin controlled).  
- 📘 **Products & Categories**: **CRUD** operations with **validation**.  
- 👥 **Suppliers**: **Manage** suppliers and **relationships** with products.  
- ⚠️ **Cascade Delete**: Deleting a product category or supplier automatically removes related products.

---

## 🎨 UI Highlights

- ✨ **Clean Design** – Built with Material-UI for a modern and consistent look.  
- 🔔 **Toast Notifications** – Real-time alerts for user actions and feedback.  
- ⚡ **Demo Quick-Start** - One-click demo login buttons on the authentication page for instant access.
- 🧭 **Dynamic Sidebar** - Navigation items conditionally render based on **user permissions**.
- 🏷️ **Status Badging** - Visual **color-coding** to clearly represent inventory health.  

---

## 📦 Installation & Setup

To get started with **Study Flux**, follow these steps:

### 1. Clone the repository

   ```bash
   git clone https://github.com/sandeepmukku12/stocksync.git
   cd stocksync
   ```

### 2. Backend Setup
   
   Navigate to the server directory and install dependencies:

   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```
   Run the server:

   ```bash
   npm start
   ```

### 3. Frontend Setup

   Navigate to the client directory and install dependencies:

   ```bash
   cd client
   npm install
   ```
   Create a `.env` file in the `client` directory:

   ```env
   VITE_APP_URL=http://localhost:5173
   ```

   Start the Vite development server:

   ```bash
   npm run dev
   ```

### ✅ Notes

- After running the frontend, open your browser at [http://localhost:5173](http://localhost:5173) (Vite default) to access the app.  
- Make sure the backend server is running before using the frontend.

---
