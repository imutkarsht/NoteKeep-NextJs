# 📒 NoteKeep  

NoteKeep is a **Next.js** web application designed to help users manage their notes efficiently.  
This project serves as a **capstone** to learn both frontend and backend development with **Next.js**.  

The application leverages a modern tech stack, including **Next.js, NextAuth, MongoDB, Tailwind CSS, bcrypt, ShadCN UI, Cloudinary, Tiptap, and Nodemailer** to provide a seamless and feature-rich experience.

---

## 🚀 Tech Stack Overview  

- **Next.js** – A React framework enabling server-side rendering (SSR) and static site generation (SSG).  
- **NextAuth** – A secure authentication library for Next.js with OAuth support.  
- **Tailwind CSS** – A utility-first CSS framework for building responsive and customizable UIs.  
- **bcrypt** – A library for securely hashing user passwords.  
- **ShadCN UI** – A collection of pre-built, accessible UI components.  
- **Nodemailer** – A module for handling email functionalities such as account verification.  
- **Cloudinary** – A cloud-based image storage solution for efficient image uploads and retrieval.  
- **Tiptap** – A rich text editor that supports markdown, enhancing note-taking functionality.  

---

## ✨ Features  

- 🌗 **Light/Dark Mode Toggle**  
- 🔐 **OAuth Support (Google & GitHub)**  
- 📝 **CRUD Operations on Notes**  
- 📜 **Markdown Support via Tiptap**  
- 🖼️ **Image Management using Cloudinary**  
- 🛠️ **Admin Panel for User & Notes Management**  
- 📊 **Analytics & Dashboard for Admins**  
- 📧 **Email Support using Nodemailer**  
- 🎨 **Clean, Responsive UI using ShadCN & Tailwind CSS**  

---

## 📌 Routes  

### **🔓 Public Routes**  
- `/about`  
- `/home`  
- `/login`  
- `/signup`  

### **👤 User Routes**  
- `/dashboard`  
- `/user/profile`  
- `/user/verify`  
- `/api/user/**`  
- `/contact`  

### **🛑 Admin Routes**  
- `/private/admin/*`  
- `/api/admin/*`  

---

## 🔧 Environment Variables  

To run this project, add the following environment variables to your `.env.local` file:

```env
MONGO_URI=
NEXTAUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MAIL_USER=
MAIL_PASS=
NEXTAUTH_URL=
CLOUDINARY_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_SECRET=
```

## Requirements

- Node.js (Version 20 or later)
- OAuth API Keys (Google & GitHub)
- Cloudinary API Credentials (API Key, Secret, and Cloud Name)
- Email Credentials (Mail Username & Password for Nodemailer)
- MongoDB URI


## Installation

Clone this repository using
```bash
https://github.com/imutkarsht/NoteKeep-NextJs.git
```
setup .env.local with values given above

```bash
  npm install
```
```bash
  npm run dev
```
    
## Screenshots

![Home Page](https://i.ibb.co/yFYJDwPt/brave-7z88tz-EKEg.png)

![Dashboard](https://i.ibb.co/s9QJXrLd/brave-wi-KGH2-Miop.png)

![signup](https://i.ibb.co/BKFWwKDP/brave-Qu-BTVv-QEq4.png)

## 🤝 Contributing
Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📩 Contact
For any queries or suggestions, feel free to reach out! 🚀

📧 Email: [email](uktiwari023@gmail.com)
🔗 
LinkedIn: [imutkarsht](https://www.linkedin.com/in/imutkarsht)

## Deployment

Check out this project at 
[Live Link](https://note-keep-next.vercel.app/)