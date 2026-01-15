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
- [🎮 Demo Access](#-demo-access)
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

## 🖼 Screenshots

### Dashboard
<div align="center">
  <img alt="Dashboard" src="./screenshots/dashboard.jpg" width="700"/>
</div>

### Products Page
<div align="center">
  <img alt="Products Page" src="./screenshots/products.jpg" width="700"/>
</div>

### Categories Page
<div align="center">
  <img alt="Categories Page" src="./screenshots/categories.jpg" width="700"/>
</div>

### Suppliers Page
<div align="center">
  <img alt="Suppliers Page" src="./screenshots/suppliers.jpg" width="700"/>
</div>

### Users Management Page
<div align="center">
  <img alt="Users Management Page" src="./screenshots/users-management.jpg" width="700"/>
</div>

### Profile Page
<div align="center">
  <img alt="Profile Page" src="./screenshots/profile.jpg" width="700"/>
</div>

### Login Page
<div align="center">
  <img alt="Login Page" src="./screenshots/login.jpg" width="700"/>
</div>

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
   VITE_API_URL=http://localhost:8082/api
   ```

   Start the Vite development server:

   ```bash
   npm run dev
   ```

### ✅ Notes

- After running the frontend, open your browser at [http://localhost:5173](http://localhost:5173) (Vite default) to access the app.  
- Make sure the backend server is running before using the frontend.

---

## 🎮 Demo Access

You can try out StockSync using the following demo credentials:

- **Admin Account**  
  📧 Email: `admin@demo.com`  
  🔑 Password: `admin123`

- **Staff Account**  
  📧 Email: `staff@demo.com`  
  🔑 Password: `staff123`

> ⚠️ **Important:** These accounts are **for testing/demo purposes only**.  
> **Do not change the password or modify critical data**, and do **not use them for production data**. All changes may be reset.

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
│ └─ .env # Environment variables (VITE_API_URL)
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

## 🗂 Key Files

Here are the important files in the StockSync project and their purposes:

### 🖥️ Frontend (`client/`)
- `src/App.jsx` – Main React component that wraps all pages and routes.  
- `src/main.jsx` – Entry point for the React + Vite app.  
- `src/components/` – Reusable UI components like ProtectedRoute, Sidebar.  
- `src/pages/` – Individual pages (Login, Register, Dashboard, Products, Categories, Suppliers, Users Management, Profile).    
- `src/api/` – Handles API calls to the backend using Axios.  
- `src/context/` – Global state management for auth.  

### ⚙️ Backend (`server/`)
- `index.js` – Entry point for the Express backend server and MongoDB connection setup.  
- `.env` – Stores environment variables like `PORT`, `MONGODB_URI`, and `JWT_SECRET`.  .  
- `controllers/` – Handle incoming requests and interact with services.  
  - `auth.controller.js` – Register/Login, Update Password endpoints.  
  - `user.controller.js` – User profile endpoints.  
  - `product.controller.js` – Product CRUD, status and search logic.  
  - `category.controller.js` – Category CRUD logic.
  - `supplier.controller.js` – Supplier CRUD logic. 
  - `report.controller.js` – Dashboard stats logic.  
- `models/` – Mongoose schemas for User, product, supplier, category. 
- `routes/` – API endpoint definitions.  
- `services/` – Business logic separate from controllers.  
- `middleware/` – JWT authentication and centralized error handling.

### 🏠 Root Files
- `README.md` – Project documentation.  
- `.env` – Environment variables for backend configuration.

---

## 🧩 Core Functionality

### 🔐 Authentication
  - Secure login using JWT-based authentication
  - Protected frontend routes and backend APIs

### 📦 Inventory Management
  - Create, view, update, and delete products
  - Manage product categories and suppliers
  - Stock status is dynamically determined by comparing quantity against a custom lowStockThreshold set per product.
  - Automatic stock status updates (In Stock, Low Stock, Out of Stock)

### ⚠️ Cascade Delete
  - Deleting a category or supplier automatically removes all related products
  - Ensures data consistency and prevents orphan records

### 📊 Stock Monitoring
  - Low-stock threshold tracking
  - Visual indicators for inventory status

### 🧭 Admin Dashboard
  - Centralized view of products, categories, and suppliers
  - Intuitive navigation through sidebar layout

### 👥 User Management
  -  Admins can create, promote, or deactivate staff accounts.

### 👤 Profile  
  - Change password securely 

### 🧭 Navigation (Sidebar)
  - The sidebar is persistent across all pages and includes:
  - 📊 Dashboard
  - 📦 Products
  - 🗂️ Categories
  - 🚚 Suppliers
  - 👥 User Management  
  - 👤 Profile 

---

## 🔐 Security & Rules

- 🔒 **Public Registration Disabled**
  - New accounts can only be created by an Admin via the User Management panel.

- 🔑 **JWT Authentication**
  - All protected routes require a valid JWT token

- 🛡️ **Protected Routes**
  - Unauthorized users cannot access inventory APIs or dashboard pages

- 🧹 **Data Integrity**
  - Cascade delete logic ensures related data is removed safely
  - Eliminates orphaned documents in the database

---

## 🧱 System Architecture

The application follows a **client–server architecture**:

- The **React frontend** handles user interactions and UI rendering
- The **Node.js + Express backend** exposes RESTful APIs
- The frontend communicates with the backend via **HTTP requests using Axios**
- **JWT tokens** are used to secure API communication
- **MongoDB** is used as the primary database for persistent storage

This architecture ensures:
- Clear separation of concerns  
- Scalability and maintainability  
- Secure and efficient data flow between client and server  

---

## 🔗 Database Schema & Relationships

### Schema

- **User**: name, email, password, role  
- **Product**: name, SKU, quantity, price, stock status, low stock threshold, category reference, supplier reference, creator  
- **Category**: name, description, creator  
- **Supplier**: name, contact details, creator  

StockSync uses a structured, relational approach within **MongoDB** to manage inventory data while maintaining strong relationships between products, categories, suppliers, and users.

### Logic Highlights

- 🔁 **User ↔ Product** – One-to-Many relationship where users can create and manage multiple products.  
- 📦 **Category ↔ Product** – One-to-Many relationship allowing each category to contain multiple products.  
- 🚚 **Supplier ↔ Product** – One-to-Many relationship to link suppliers with their supplied products.  
- ⚠️ **Cascade Delete** – Deleting a category or supplier automatically removes all related products to maintain data integrity.  
- 👤 **Ownership Rules** – Products, categories, and suppliers store a `createdBy` field to enforce permission-based updates and deletions.

---

## 📈 Future Enhancements

- 🔔 **Real-Time Stock Alerts via in-app notfications or email**
- 📊 **Advanced Analytics Dashboard**
- 👥 **Role-Based Access Expansion**  
- 🧾 **Inventory History & Audit Logs**
- 📦 **Support for CSV/Excel-based Import & Export**  
- 🌐 **Multi-Warehouse Support**

---

## 📄 License

This project is licensed under the **MIT License**. See the LICENSE file for more info.

---

## ❤️ Built With Love

**StockSync** was built with :heart: by **Sandeep Mukku**  
It’s designed to help teams **manage inventory**, **track stock levels**, and **maintain data consistency** through a simple and reliable system.

Thank you for checking out the project! 🙌

---
