# ✨ BlogHub — Full-Stack Blogging Platform

A full-stack blog application built using **React (Vite)** for the frontend,  
**Node.js + Express** for the backend, and **MySQL** for database management.

This platform allows users to register, create blogs, edit them, comment on blogs,  
and view all posts with a clean UI and secure backend.

---

# 🛠️ Tech Stack

### **Frontend**
- React + Vite  
- React Router  
- Axios  
- CSS / Tailwind CSS  

### **Backend**
- Node.js  
- Express.js  
- MySQL (Workbench)  
- MySQL2 / Sequelize  
- bcrypt  
- JWT (Authentication)  

### **Tools**
- VS Code  
- Thunder Client (API Testing)  
- MySQL Workbench  
- Git & GitHub  

---

# 🏷️ Badges

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-563D7C?style=for-the-badge&logo=vite&logoColor=FFD62E)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-02569B?style=for-the-badge&logo=mysql&logoColor=white)
![ThunderClient](https://img.shields.io/badge/ThunderClient-181717?style=for-the-badge&logo=visual-studio-code&logoColor=007ACC)

---

# 📁 Folder Structure (Visual Diagram)

```bash
BlogHub/
│
├── OurBlogs-website-frontend/          # React + Vite Frontend
│   ├── public/                         # Static files
│   ├── src/
│   │   ├── components/                 # UI components (Navbar, Buttons)
│   │   ├── pages/                      # Page components (Home, Blogs)
│   │   ├── services/                   # API calls (Axios)
│   │   ├── context/                    # Auth / state management
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── Backend/                            # Node.js + Express Backend
│   ├── config/                         # MySQL connection
│   ├── controllers/                    # Route logic
│   ├── routes/                         # API endpoints
│   ├── models/                         # SQL models / queries
│   ├── middleware/                     # JWT auth / validation
│   ├── helpers/                        # Utility functions
│   ├── uploads/                        # Uploaded images (optional)
│   ├── index.js or app.js              # Server entry
│   ├── package.json
│   └── .env                            # Environment variables
│
├── .gitignore
└── README.md
