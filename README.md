# DoctorDesk (or Your Project Name)

DoctorDesk is a modern, full-stack medical appointment system where doctors and users have role-based access. Doctors can manage their availability, time slots, and services, while users can book appointments seamlessly.

## 🛠 Tech Stack

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (Role-based Auth)
- **Database:** MongoDB (with Mongoose)
- **API Communication:** RESTful APIs (Axios)

## 📁 Project Structure

/project-root
│
├── /backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── middleware/
│ ├── server.js
│ ├── .env
│ └── package.json
│
├── /frontend
│ ├── public/
│ ├── src/
│ ├── App.js
│ ├── index.js
│ └── package.json
│
├── README.md
└── .gitignore


## 🔐 Features

- Doctor and User Registration & Login
- JWT Role-Based Authentication
- Doctors can:
  - Add slots and services
  - Manage availability
- Users can:
  - Book available slots
  - View doctor details
- MongoDB for data storage
- Frontend and backend run independently

## 🚀 Getting Started

### Backend

```bash
cd backend
npm install
npm run dev

//ENV
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
