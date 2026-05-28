# Oil Management POS System 🚗🛢️

A comprehensive, tailored, offline-first Point of Sale (POS) and Inventory Management System designed specifically for a freelance client operating in the automotive oil and maintenance sector. 

This platform bridges the gap between premium design aesthetics and complex business logic, enabling the client to track daily operations, manage dynamic inventory configurations, and handle automated financial reporting smoothly.

---

## 🚀 Core Architectural Highlights

*   **Offline-First Local Deployment:** Customized deployment engineered to run 100% offline. Built using a specialized automated startup script (`.bat`) that provisions both frontend and backend server instances with a single click, completely abstracting terminal complexity for the end-user.
*   **Headless CMS Backing:** Powered by **Strapi Headless CMS** to architecturalize complex database relationships, ensuring data consistency and strict validation guardrails.
*   **High-Performance State Orchestration:** Utilizing **React Query** for server state management and asynchronous data fetching alongside **React Hook Form** to optimize dynamic component form renders.

---

## 🛠️ Tech Stack & Technical Tools

*   **Frontend Ecosystem:** React.js, Tailwind CSS.
*   **State & Form Management:** React Query (TanStack Query), React Hook Form.
*   **Backend Architecture:** Strapi (Headless CMS).
*   **Automation:** Windows Batch Scripting (`.bat`).
*   **Hardware Integration:** Barcode Scanner, Thermal Printers.

---

## ✨ Key Features & Live Screens

### 1. Premium Financial Dashboard & Data Visualization
Provides real-time, zero-latency breakdowns of daily cash reserves, credit (debts), and running operational expenses. It features visual performance metrics displaying top-selling products using custom progress tracking.
> *Handled via **React Query** to update financial calculations dynamically upon transaction completion.*

📊 **Dashboard View:**
![Financial Dashboard](1.png)

---

### 2. Live Expense Tracking (الخوارج)
Dedicated portal for logging ongoing operating expenditures. Any logged expense dynamically computes and updates the cash reserves and net profit margins across the central dashboard layout.

💸 **Expense Tracker:**
![Expense Tracking Page](2.png)

---

### 3. Smart Inventory Control & Low-Stock Alerts
Automated warehouse monitoring that prevents stock discrepancies. The system features a real-time reactive trigger that flags products into a critical alert board ("النواقص") the moment stock dips below 20 units.

⚠️ **Low-Stock Alert Center:**
![Stock Alerts Panel](3.png)

---

### 4. Advanced Product Variants Architecture
Handles complex product structuring using a **Self-Referencing Relationship** via `parent_id`. Products with identical branding but varying fluid volumes (e.g., 1L, 4L, 5L) are structured hierarchically. 
The form leverages **React Hook Form** to control highly interactive row insertion, tracking distinct prices, stock levels, and barcodes per variant without causing unnecessary re-renders.

📝 **Dynamic Form Architecture:**
![Variant Form Management](Screenshot%202026-05-28%20100733.png)

---

### 5. Point of Sale Terminal & Checkout Workflow
An interactive, high-speed cash register screen built for heavy day-long operations. Fully integrated with physical **Barcode Scanners** for quick item selection, manual discount allocation, and split-payment management (Cash vs. Credit/Debts).

🛒 **POS Workspace:**
![POS Interface](6.png)
🔲 **Checkout Modal:**
![Checkout Flow](5.png)

---

### 6. Hardware Integration & Thermal Receipts
Custom-tailored `ThermalReceipt` canvas optimized directly for structural layout rendering on physical thermal paper. Generates comprehensive end-of-day shifting updates and distinct client receipts on the fly.

🧾 **Thermal Receipt Canvas:**
![Generated Receipt](Screenshot%202026-05-28%20093703_2.png)

---

## ⚙️ How It Works (Local Automation)

Since the production requirement necessitated a strict **100% Offline/Local Environment**, the system architecture uses a seamless execution sequence:

1. Local machine triggers the customized execution script: `run-pos-system.bat`.
2. The batch command spins up the backend relational environment (**Node.js/Strapi Core**).
3. Simultaneously provisions the **React client node bundle**.
4. Spawns an automated trigger opening the localized viewport at `http://localhost:3000`.

---
*Developed as a custom freelance business solution.*
