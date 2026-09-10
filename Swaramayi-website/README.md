# Swarnamayi Real Estate Marketing Website

> **"Your Dream Property. Our Trusted Guidance."**

Complete full-stack, modern, luxury real estate marketing and property discovery platform built for **Swarnamayi Real Estate Marketing** in Kolkata, West Bengal, India.

---

## 🌟 Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS with custom Swarnamayi luxury brand palette (Navy `#071A3D`, Royal Blue `#0B3D91`, Metallic Gold `#D4AF37`)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Slider**: Swiper.js
- **API Client**: Axios with JWT Interceptors
- **SEO & Meta**: React Helmet Async + Schema.org JSON-LD

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB + Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs password hashing
- **Security**: Helmet, CORS, Express Rate Limit
- **File Handling**: Multer file upload architecture with file type & extension validation

---

## 🚀 Folder Structure

```
d:\Swaramayi-website\
├── backend/
│   ├── config/ (db.js)
│   ├── controllers/ (auth, property, project, location, enquiry, siteVisit, file, agent, user)
│   ├── models/ (Property, Project, Location, Agent, Enquiry, SiteVisit, User, Admin, File...)
│   ├── routes/ (authRoutes, propertyRoutes, projectRoutes, locationRoutes...)
│   ├── middleware/ (authMiddleware, adminMiddleware, uploadMiddleware, errorMiddleware)
│   ├── uploads/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── assets/ (logo.png - official Swarnamayi logo)
    │   ├── components/ (Navbar, Footer, HeroSlider, PropertySearch, PropertyCard, FilterSidebar, Calculators...)
    │   ├── pages/ (Home, Properties, PropertyDetails, Projects, Locations, Services, About, Files, Contact, Favorites, Compare, FAQ, Auth, Legal...)
    │   ├── admin/ (AdminLayout, AdminDashboard, AdminProperties, AdminProjects, AdminEnquiries, AdminSiteVisits...)
    │   ├── context/ (AuthContext, FavoritesContext, CompareContext)
    │   ├── services/ (api, propertyService, projectService, locationService, enquiryService...)
    │   ├── App.jsx
    │   └── main.jsx
```

---

## 💻 Quick Start & Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed     # Populate database with Kolkata listings & default admin
npm start        # Starts server on http://localhost:5001
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev      # Starts Vite dev server on http://localhost:5173
```

---

## 🔑 Default Credentials (Development)

- **Admin Portal**: `http://localhost:5173/admin/login`
  - **Email**: `admin@swarnamayi.com`
  - **Password**: `Admin@123456`
- **Demo User**:
  - **Email**: `user@swarnamayi.com`
  - **Password**: `Admin@123456`

---

## 📌 Features Included

1. **Official Logo & Branding**: Integrated official logo across Navbar, Footer, Admin, and Login portals.
2. **Kolkata Focus**: Pre-configured locations (New Town, Rajarhat, Salt Lake, EM Bypass, Ballygunge, Alipore, Garia, Tollygunge).
3. **Property Search & Advanced Filters**: Category (Buy/Rent/Commercial/PG), BHK, Price Range, Sqft, Furnishing, RERA status, and sorting.
4. **Interactive EMI Calculator**: Monthly EMI calculation for home loan buyers.
5. **Property Comparison & Favorites**: Compare up to 4 properties side-by-side; persist bookmarks.
6. **Lead Management**: Property enquiries and site visit scheduling sent directly to MongoDB and manageable in Admin Dashboard.
7. **Admin Dashboard**: Full CRUD for Properties, Projects, Locations, Enquiries, Site Visits, Users, Files, and Agents.
8. **SEO Architecture**: Meta titles, OpenGraph, XML Sitemap (`sitemap.xml`), `robots.txt`, and Schema.org JSON-LD structured data.
