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

## 🚀 Usage

### 1️⃣ Authentication & Demo Access
- 🌐 **Access the App** - Open `http://localhost:5173` in your browser.
- ⚡ **Quick Login** - Use the **Admin** or **Staff** demo buttons on the login screen to auto-fill credentials.
- 🔐 **Security Check** - Public registration is disabled — only an **Admin** can add new team members.


### 2️⃣ The Admin Experience (Full Control)
- 📊 **Dashboard Analytics** - View real-time stock distribution and value charts powered by **📊 Recharts**.
- 👥 **User Management** - Navigate to the **Users Management** tab to view all staff. Try promoting a **Staff** member to **Admin**.
- 📦 **Product Inventory** - Add new products or edit existing stock. When an item falls below its **Low Stock Threshold**, the UI instantly displays a **⚠️ Low Stock** badge.
- 📦 **Categories** - Add new category or edit existing category.
- 🚚 **Suppliers** - Add new supplier or edit existing supplier.


### 3️⃣ The Staff Experience (Restricted)
- 🚫 **Permission Enforcement** - Log out and sign in as **Staff** — the **Users** management tab will no longer appear in the sidebar.
- 👀 **View-Only Access** - Staff can monitor inventory and update stock levels but are restricted from sensitive administrative settings.


### 4️⃣ Data Integrity & Cascade Logic
- 🚚 **Supplier Management** - Navigate to the **Suppliers** tab.
- 🧨 **Test Cascade Delete** - Delete a supplier from the list.
- ✅ **Verification** - Return to the **Products** page — all products linked to that supplier are automatically removed to maintain data integrity  
  *(handled via Mongoose middleware)*.

### 5️⃣ Search & Optimization
- 🔍 **Global Search** - Use the table search bar to find products by **Name** or **SKU**.
- 🧩 **Responsive Filtering** - Filter inventory by **Category** or **Supplier** or **Stock Status** (**In Stock**, **Low Stock**, **Out of Stock**) to see the dynamic UI in action.

---

## 🏗 App Structure

```bash
stocksync/
│
├─ client/ # Frontend built with React + Vite
│ ├─ public/ # Static assets (images, icons, etc.)
│ ├─ src/
│ │ ├─ components/ # Reusable React components
| | ├─ dashboard/ # Dashboard layout
│ │ ├─ pages/ # Page components (Login, Register, Dashboard, Products, Categories, Suppliers, Users Management, Profile)
│ │ ├─ api/ # API calls using Axios
│ │ └─ context/ # React context for global state (auth)
│ └─ .env # Environment variables (VITE_APP_URL)
|
├─ server/ # Backend built with Node.js + Express
│ ├─ controllers/ # Handles incoming requests
│ ├─ models/ # Mongoose schemas (User, product, supplier, category)
│ ├─ routes/ # API route definitions
│ ├─ services/ # Business logic for controllers
│ ├─ middleware/ # Authentication & error handling
| └─ .env # Environment variables (PORT, DB URI, JWT secret)
│
└─ README.md # Project documentation
```

---
