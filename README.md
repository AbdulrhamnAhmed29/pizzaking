# 🚗🛢️ OIL MANAGEMENT SYSTEM — Modern POS & Inventory Platform

---

## 🌐 Overview

**Oil Management POS System** is a high-end, tailored, offline-first Point of Sale (POS) and comprehensive Inventory Management System designed specifically for the automotive oil and maintenance sector.

The platform bridges the gap between premium visual design aesthetics and complex operational logic, enabling users to track daily cash reserves, manage dynamic product-variant hierarchies, and handle real-time automated financial reporting.

Built with a strong focus on **data consistency, strict validation guardrails, and zero-latency local operations**.

---

## ✨ Core Features

### 📊 Premium Dashboard & Analytics

* Dark-mode luxury UI designed with high-end aesthetic components
* Real-time financial metrics tracking daily cash flow, expenses, and debts (الآجل)
* Dynamic visual charts displaying top-selling products via intuitive progress metrics
* Advanced date-filtering architecture for flexible, on-demand statistical updates

---

### 🛒 Point of Sale & Checkout Workflow

* Interactive, high-speed POS register built for continuous daily operations
* Physical Barcode Scanner integration for rapid product identification
* Split-payment orchestration (Cash vs. Credit/Debts) with manual discount allocation
* Real-time reactive stock updates immediately triggered upon order completion

---

### 📦 Smart Inventory & Low-Stock Alerts

* Automated product directory tracking comprehensive warehouse assets
* Built-in critical alert board ("النواقص") triggered instantly when stock levels drop below 20 units
* Strict automated inventory validation framework to eliminate negative stock errors
* Centralized logging system tracking all past historical transactions and sales

---

### 💸 Live Expense Control (الخوارج)

* Dedicated transactional portal for logging operational expenditures
* Dynamic financial ledger that instantly recalculates net profit margins
* Automated synchronization linking logged expenses directly back to the central dashboard

---

## 🧱 Tech Stack

| Layer            | Technology                                |
| ---------------- | ----------------------------------------- |
| Frontend         | React.js, Tailwind CSS                    |
| State Management | TanStack Query (React Query)              |
| Form Handling    | React Hook Form                           |
| Backend          | Strapi (Headless CMS)                     |
| Automation       | Windows Batch Scripting (`.bat`)          |
| Hardware Sync    | Physical Barcode Scanners, Thermal Printers |

---

## 🏗️ Engineering & Architecture

* **Advanced Self-Referencing Layout:** Structures complex product options hierarchically using a `parent_id` architecture for variant grouping (e.g., 1L, 4L, 5L fluid volumes).
* **High-Performance Form Orchestration:** Leverages *React Hook Form* to control intensive, row-by-row relational insertion without trigger-happy re-renders.
* **Server-State Synchronization:** Employs *React Query* to cache, update, and mutate complex financial data cleanly across disjointed views.
* **Hardware-Targeted Components:** Tailored `ThermalReceipt` canvas explicitly optimized for precise layout rendering on physical thermal papers.

---

## 🚀 Deployment & Local Automation

* **100% Offline Architecture:** Engineered to provision and operate completely independent of internet dependencies.
* **Single-Click Orchestration:** Powered by a customized startup automation script (`.bat`) that boots the complete server environment in one action.
* **Zero-Terminal Friction:** Automatically spins up the backend Node/Strapi runtime alongside the local React client instance, instantly launching the secure local workspace view at `http://localhost:3000`.

---

## 📸 Project Showcase

<p align="center">
  <img src="dash1.png" width="100%" alt="Oil Management Main Dashboard" />
  <br>
  <b>✨ Premium Dashboard - Financial & Analytics Overview</b>
</p>

---

### 📊 Advanced Analytics & Operations
<table border="0">
  <tr>
    <td width="50%">
      <img src="dash2.png" width="100%" alt="Filtered Statistics View" />
      <p align="center"><i>Dynamic Date-Filtered Metrics</i></p>
    </td>
    <td width="50%">
      <img src="expenses.png" width="100%" alt="Expense Tracking Page" />
      <p align="center"><i>Live Expense Ledger (الخوارج)</i></p>
    </td>
  </tr>
</table>

---

### 📦 Warehouse Architecture & Alerts
<table border="0">
  <tr>
    <td width="50%">
      <img src="lower.png" width="100%" alt="Low-Stock Alert Center" />
      <p align="center"><i>Reactive Low-Stock Board ("النواقص")</i></p>
    </td>
    <td width="50%">
      <img src="products.png" width="100%" alt="Inventory Management Table" />
      <p align="center"><i>Hierarchical Product Variant Catalog</i></p>
    </td>
  </tr>
</table>

---

### 🛒 High-Speed POS Checkout Terminal
<p align="center">
  <img src="sales.png" width="100%" alt="POS Workspace Terminal" />
  <br>
  <b>🛒 POS Workspace & Live Checkout Processing</b>
</p>

---

## ⚙️ Getting Started

### 1. Requirements
Ensure you have **Node.js** and **Strapi CMS** configured on your local machine environment.

### 2. Local Setup
Clone the repository to your designated directory:
```bash
git clone [https://github.com/AbdulrhamnAhmed29/Oil-Management-System](https://github.com/AbdulrhamnAhmed29/Oil-Management-System)