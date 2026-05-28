# 🚗 OIL MANAGEMENT SYSTEM
### Enterprise POS & Inventory Platform for Automotive Oil Businesses

---

## 🌐 Overview
**Oil Management System** is a modern, offline-first Point of Sale (POS) and Inventory Management platform engineered specifically for automotive oil shops, lubrication centers, and vehicle maintenance businesses.

The system combines high-performance operational workflows, financial tracking, and warehouse management into a unified desktop-focused experience optimized for real-world daily usage.

Designed with a strong emphasis on:
* ⚡ **Real-time performance**
* 🧠 **Business-oriented architecture**
* 🔒 **Data consistency & validation**
* 📦 **Inventory reliability**
* 🧾 **Financial transparency**
* 🖥️ **Zero-latency local operations**

---

## ✨ Key Features

### 📊 Advanced Dashboard & Business Analytics
A premium analytics dashboard providing instant visibility into operational performance.
* Real-time sales and profit tracking
* Daily cash-flow monitoring
* Debt management system (الآجل)
* Dynamic statistical filtering by date ranges
* Top-selling products visualization
* Smart KPI cards and progress metrics
* Live recalculated business indicators

### 🛒 High-Speed POS System
Optimized for rapid in-store checkout workflows.
* Lightning-fast checkout experience
* Barcode scanner integration
* Split payment handling (Cash / Credit)
* Manual discount processing
* Real-time cart calculations
* Reactive stock deduction after successful orders
* Thermal receipt printing support

### 📦 Smart Inventory Management
Enterprise-grade warehouse management built around strict validation logic.
* Product quantity tracking
* Variant-based inventory architecture
* Hierarchical product relationships
* Automated low-stock detection
* Critical stock alert board ("النواقص")
* Historical sales & transaction logging
* Protection against negative inventory states

### 💸 Expense & Financial Control
Integrated expense management module tightly connected to business analytics.
* Operational expense logging
* Live profit recalculations
* Financial ledger synchronization
* Expense categorization
* Daily operational tracking

---

## 🧱 Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js |
| **Styling** | Tailwind CSS |
| **Server State** | TanStack Query (React Query) |
| **Form Management** | React Hook Form |
| **Backend CMS** | Strapi |
| **Runtime** | Node.js |
| **Automation** | Windows Batch Scripts (`.bat`) |
| **Hardware Support** | Barcode Scanners & Thermal Printers |

---

## 🏗️ System Architecture & Engineering Decisions

* **🔹 Offline-First Infrastructure:** The entire system is designed to operate independently from cloud dependencies, enabling stable operation in local business environments with unreliable internet connectivity.
* **🔹 Hierarchical Product Variant System:** Implemented using a self-referencing relational architecture (`parent_id`) allowing complex product structures such as fluid volumes (1L, 4L, 5L) while maintaining grouped inventory relationships and scalable warehouse logic.
* **🔹 High-Performance Form Handling:** Large transactional forms are managed using *React Hook Form* to minimize unnecessary component re-renders and maintain responsive UI interactions during intensive operations.
* **🔹 Server-State Synchronization:** The platform uses *TanStack Query* for intelligent caching, optimistic updates, mutation orchestration, and server-state consistency across highly dynamic financial and inventory views.
* **🔹 Hardware-Optimized Components:** Custom receipt rendering components were specifically engineered for thermal printers, compact receipt layouts, accurate print alignment, and production-grade POS printing.

---

## 🚀 Deployment & Local Automation

### ⚙️ One-Click Startup Experience
The application environment is fully automated using custom Windows batch scripting. The orchestration script automatically:
1. Starts the Strapi backend server
2. Launches the React frontend
3. Boots the local workspace environment
4. Opens the application instantly at: `http://localhost:3000`

### 🔒 100% Local Runtime
No external services are required for daily operation. This ensures maximum speed, operational stability, local business privacy, and reduced infrastructure costs.

---

## 📸 Project Showcase

### 📊 Dashboard & Financial Analytics

#### Main Dashboard Overview
![Main Dashboard](dash1.png)

#### 📈 Statistical Analytics (Date Filtered Metrics)
![Statistical Analytics](dash2.png)

---

### 💸 Expense Management

#### Expenses Ledger (الخوارج)
![Expense Management](expenses.png)

---

### 📦 Inventory & Stock Monitoring

#### Low Stock Alerts ("النواقص")
![Low Stock Alerts](lower.png)

#### Product Management Table & Variant Catalog
![Product Management](products.png)

---

### 🛒 POS Checkout Experience

#### POS Terminal Workspace & Checkout Flow
![POS Terminal](sales.png)

---

## ⚙️ Installation & Local Setup

### 1️⃣ Requirements
Ensure the following are installed locally:
* Node.js
* npm
* Strapi CMS

### 2️⃣ Clone Repository
```bash
git clone [https://github.com/AbdulrhamnAhmed29/Oil-Management-System](https://github.com/AbdulrhamnAhmed29/Oil-Management-System)