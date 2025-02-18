# NoteKeep

NoteKeep is a web application built using Next.js, designed to help users manage their notes efficiently. The application leverages a modern tech stack including Next.js, NextAuth, MongoDB, Tailwind CSS, bcrypt, ShadCN UI, and Nodemailer. 

It is a capstone project to learn both NextJS frontend and backend parts.

## Tech Stack Overview

- **Next.js**: A React framework that enables functionality such as server-side rendering and generating static websites.
- **NextAuth**: An authentication library for Next.js applications, providing a secure and easy-to-implement authentication system.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **bcrypt**: A library to help hash passwords, ensuring secure storage of user credentials.
- **ShadCN UI**: A collection of reusable components for building user interfaces.
- **Nodemailer**: A module for Node.js applications to allow easy email sending.
- **Cloudinary**: A Image Storage and Provider to help users upload their images and access them efficiently
## Features

- Light/dark mode toggle
- OAuth Support (Upcoming)
- CRUD Opeartions on Notes
- Markdown Support using Tiptap (upcoming)
- Image Management using Cloudinary (upcoming)
- Admin Panel for user and notes control and analytics
- Clean responsive UI using shadcn and Tailwind css
- Email Support using Nodemailer



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`NEXTAUTH_SECRET`

`GITHUB_CLIENT_ID`

`GITHUB_CLIENT_SECRET`

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`MAIL_USER`

`MAIL_PASS`

`NEXTAUTH_URL`


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



## Deployment

Check out this project at 
[Live Link](https://note-keep-next.vercel.app/)