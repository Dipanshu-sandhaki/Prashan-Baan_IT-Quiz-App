
**Prashan Baan** is a web-based quiz application developed for **IT Utsav 3.O** at the School of Computing Sciences, Uttaranchal University, Dehradun.  
The project is designed to test and improve learners’ knowledge in Information Technology through an interactive, engaging quiz interface.

---

## 📑 Table of Contents

1. [Features](#-features)  
2. [Technologies Used](#-technologies-used)  
3. [Architecture & Directory Structure](#-architecture--directory-structure)  
4. [Setup & Installation](#-setup--installation)  
5. [Usage](#-usage)  
6. [Configuration](#-configuration)  
7. [Testing](#-testing)  
8. [Contributions](#-contributions)  
9. [Achievements & Future Work](#-achievements--future-work)  
10. [License](#-license)  
11. [Contact](#-contact)

---

## ✨ Features

- 🎯 User-friendly quiz interface with multiple-choice questions  
- 📊 Scoring system: instant feedback on correct / incorrect answers  
- 📱 Responsive design for desktop and mobile  
- ⚡ Fast, modular, and maintainable code  
- 🛠 Easy to extend with new quizzes or categories  
- ⏱ (Optional) quiz timer support  

---

## 🛠 Technologies Used

| Layer      | Technology (example – update as per your stack) |
|------------|------------------------------------------------|
| Frontend   | React.js / JavaScript, HTML5, CSS3             |
| Backend    | Node.js, Express.js                            |
| Database   | MongoDB / MySQL                                |
| Hosting    | Netlify / Vercel / Heroku / Localhost          |
| Tools      | Git, npm, VS Code, etc.                        |

---

## 📂 Architecture & Directory Structure

Prashan-Baan_IT-Quiz-App/
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── assets/
│ │ ├── styles/
│ │ └── ...
│ └── package.json
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── database/
│ └── server.js
├── README.md
└── .gitignore

- `frontend/` → User interface (React / JS, CSS, assets)  
- `backend/` → Server logic, APIs, database integration  
- `controllers/` → Handles requests and responses  
- `models/` → Database schema / structures  
- `routes/` → API endpoints for quiz & users  

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v14+)  
- npm or yarn  
- Database installed (MongoDB/MySQL) or use cloud service  

### 2. Clone the repository
```bash
git clone https://github.com/Dipanshu-sandhaki/Prashan-Baan_IT-Quiz-App.git
cd Prashan-Baan_IT-Quiz-App
3. Backend Setup
cd backend
npm install
•	Copy environment variables:
cp .env.example .env
Update .env with DB credentials, port, and secret keys.
•	Start backend server:
npm start
# or
npm run dev
4. Frontend Setup
cd ../frontend
npm install
npm start
5. Access the app
•	Frontend: http://localhost:3000
•	Backend: http://localhost:5000
________________________________________
🚀 Usage
•	Start the frontend and backend servers.
•	Open the app in a browser.
•	Choose a quiz category → Attempt questions → Submit answers.
•	Get instant results and scores.
•	Admins can add/update quizzes via backend or DB (if implemented).
________________________________________
🔧 Configuration
Create a .env file in the backend with variables such as:
PORT=5000
DB_URI=mongodb://localhost:27017/prashan-baan
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
________________________________________
🧪 Testing
If tests are implemented:
npm test
Covers:
•	API endpoints
•	Quiz logic
•	Database connections
________________________________________
🤝 Contributions
Contributions are welcome!
1.	Fork the repo
2.	Create a new branch (feature-xyz)
3.	Commit changes (git commit -m "Add xyz feature")
4.	Push branch (git push origin feature-xyz)
5.	Open a Pull Request
________________________________________
🏆 Achievements & Future Work
✅ Achievements
•	Successfully deployed and presented at IT Utsav 3.O
•	Fully functional IT quiz application with scoring
•	Modular architecture with frontend–backend separation
🔮 Future Enhancements
•	User authentication and profiles
•	Leaderboard and rankings
•	Admin dashboard to manage quizzes
•	Timer-based competitive mode
•	Improved UI/UX design
________________________________________
📜 License
This project is licensed under the MIT License – feel free to use and modify with attribution.
________________________________________
📬 Contact
Dipanshu Sandhaki
📧 Email: dipanshusandhaki17@gmail.com
🔗 GitHub: https://github.com/Dipanshu-sandhaki
💼 LinkedIn: https://www.linkedin.com/in/dipanshusandhaki/
________________________________________


