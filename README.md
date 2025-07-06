# 📦 Swift Parcel

A **full-stack MERN** based courier management system with **automated pricing, real-time tracking, and role-based dashboards** for users, riders, and admins.

---

## 🚀 Live Demo

[🔗 Click here to visit the deployed site]()

---

## 🗂️ Key Features

- **Automated Pricing & Tracking**

  - Calculates delivery cost dynamically based on parcel type, weight, and zones.
  - Generates unique tracking ID and maintains event history (submitted, paid, assigned, picked, delivered).

- **Role-based Access & Workflow**

  - Users can submit parcels, pay online, and track their status.
  - Riders have dashboards for assigned deliveries, earnings, and cashout management.
  - Admins manage users, riders, parcels, payments, and view analytics.

- **OTP-based Secure Delivery**

  - Ensures verification before marking a parcel as delivered.

- **Nationwide Coverage (64 districts)**

  - Supports region-wise and district-wise service centers for pickup and delivery.

- **Transparent Commission Structure**

  - Rider earnings calculated based on intra-city and inter-city rates with cashout tracking.

- **Stripe Payment Integration**

  - Secure online payments with auto status updates upon successful transactions.

- **Dynamic Dashboard Charts**

  - Visual insights for admins and riders using Recharts.

- **Parcel Event History**

  - Stores each parcel's progress with timestamp and remarks for transparency.

- **Responsive UI with DaisyUI + Tailwind**

  - Optimized for desktop and mobile users with clean, modern design.

- **Protected Routes & JWT Authentication**
  - Ensures secure access to user-specific and role-specific data.

---

## ⚙️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, DaisyUI, Axios, React Router, React Query
- **Backend:** Express.js, Node.js, MongoDB, Stripe
- **Authentication:** Firebase Authentication with JWT
- **Charts:** Recharts

---

## 🛠️ Setup & Installation

1. **Clone the repository:**

   ```bash
   client side repository: git clone https://github.com/MughniRayhan/swift-parcel-client
   server side repository: git clone https://github.com/MughniRayhan/swift-parcel-server
   cd your-repo-name
   ```

2. **Install dependencies:**
   npm install
   cd client
   npm install

3. **Create .env files in root and client with:**
   MONGODB_URI=your_mongodb_uri
   STRIPE_SECRET_KEY=your_stripe_secret
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   FIREBASE_API_KEY=your_firebase_api_key
   JWT_SECRET=your_jwt_secret

4. **Run the application:**
   -Backend:
   npm start or nodemon index.js
   -Frontend:
   cd client
   npm run dev

👤 User Roles
User: Submit parcels, make payments, track parcels.
Rider: View assigned parcels, update status, view earnings.
Admin: Manage all users, riders, parcels, payments, and site analytics.

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss proposed changes.

✨ Author
Name: Mughni Rayhan (Tisha)
LinkedIn: www.linkedin.com/in/mughnirayhan
GitHub: github.com/MughniRayhan

⭐ If you found this project helpful, give it a star!
