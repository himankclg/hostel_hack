const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/hostelDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

/*
   SCHEMAS
*/

// Query schema
const querySchema = new mongoose.Schema({
    studentName: String,
    Room: Number,
    queryText: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Query = mongoose.model("Query", querySchema);

// Notice schema
const noticeSchema = new mongoose.Schema({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Notice = mongoose.model("Notice", noticeSchema);

// Default root → /home
app.get("/", (req, res) => {
    res.redirect("/home");
});


/*
   HOME
 */

app.get("/home", (req, res) => {
    res.send(`
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background-color: #080e65; /* Solid fallback */
            font-family: 'Poppins', sans-serif;
            height: 100vh;
            overflow: hidden;
            /* Using a linear gradient overlay with your background theme */
            background: linear-gradient(rgba(8, 14, 101, 0.8), rgba(8, 14, 101, 0.8)), url('IMG-20260206-WA0001.jpg');
            background-size: cover;
            background-position: center;
            position: relative;
        }

        /* Header Styling */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 80px;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
            z-index: 1000;
            border-bottom: 2px solid #4b0ca8;
        }
        
        .logo-section {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .logo-section img {
            height: 60px; /* Adjusted for visibility */
            width: auto;
        }

        .university-name {
            color: white;
            line-height: 1.2;
        }

        .university-name h1 {
            font-size: 18px;
            letter-spacing: 1px;
        }

        .profile-section {
            display: flex;
            align-items: center;
            gap: 12px;
            color: white;
            text-align: right;
        }

        .profile-section img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 2px solid #00d4ff;
        }

        /* Main Layout */
        .main-content {
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .welcome-text {
            color: white;
            text-align: center;
            margin-bottom: 40px;
            animation: fadeInDown 0.8s ease;
        }

        .welcome-text h2 {
            font-size: 36px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .dashboard {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            max-width: 1100px;
            width: 100%;
        }

        /* Portal Cards */
        .portal-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            border-radius: 20px;
            padding: 50px 30px;
            text-align: center;
            color: white;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 15px 35px rgba(0,0,0,0.5);
        }

        .portal-card:hover {
            transform: translateY(-15px);
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid #00d4ff;
            box-shadow: 0 20px 50px rgba(0, 212, 255, 0.3);
        }

        .icon-circle {
            width: 80px;
            height: 80px;
            background: rgba(75, 12, 168, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 35px;
            transition: 0.3s;
        }

        .portal-card:hover .icon-circle {
            background: #4b0ca8;
            transform: scale(1.1);
        }

        .portal-card h3 {
            font-size: 24px;
            margin-bottom: 15px;
        }

        .portal-card p {
            font-size: 14px;
            opacity: 0.8;
            line-height: 1.6;
        }

        /* Colors for different sections */
        .hostel { border-bottom: 5px solid #00d4ff; }
        .mess { border-bottom: 5px solid #4ecdc4; }
        .admin { border-bottom: 5px solid #ff6b6b; }

        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
            .dashboard { grid-template-columns: 1fr; }
            body { overflow-y: auto; }
            .main-content { padding-top: 120px; height: auto; }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header class="header">
        <div class="logo-section">
            <div class="university-name">
                <h1>DELHI TECHNOLOGICAL UNIVERSITY</h1>
                <p style="font-size: 10px; color: #00d4ff;">Excellence in Engineering</p>
            </div>
        </div>

        <div class="profile-section">
            <div>
                <p style="font-weight: 600;">JATIN YADAV</p>
                <p style="font-size: 11px; opacity: 0.7;">CSE | 1st Year</p>
            </div>
            <img src="Photo.jpeg" alt="Profile">
        </div>
    </header>

    <div class="main-content">
        <div class="welcome-text">
            <h2>University Service Portal</h2>
            <p>Select a department to continue</p>
        </div>

        <div class="dashboard">
            <a href="http://localhost:8000/home/hostel" class="portal-card hostel">
                <div class="icon-circle">
                    <i class="fas fa-hotel" style="color: #00d4ff;"></i>
                </div>
                <h3>Hostel</h3>
                <p>Manage room allotments, leave applications, and view hostel-specific notices.</p>
            </a>

            <a href="http://localhost:8000/home/mess" class="portal-card mess">
                <div class="icon-circle">
                    <i class="fas fa-utensils" style="color: #4ecdc4;"></i>
                </div>
                <h3>Mess</h3>
                <p>Check daily menus, register for meals, or submit feedback regarding food quality.</p>
            </a>

            <a href="http://localhost:8000/home/admin" class="portal-card admin">
                <div class="icon-circle">
                    <i class="fas fa-user-shield" style="color: #ff6b6b;"></i>
                </div>
                <h3>Admin</h3>
                <p>Administrative access for faculty and staff to manage student records and requests.</p>
            </a>
        </div>
    </div>

</body>
  `);
});

/* 
   ADMIN PANEL
 */

app.get("/home/admin", async (req, res) => {
    const queries = await Query.find();

    let html = `<h1>Admin Panel</h1>
              <button onclick="location.href='/home/admin/newnotice'">New Notice</button>
              <hr>
              <h2>All Queries</h2>`;

    queries.forEach(q => {
        html += `
      <style>
        body{
          background-color: #080e65ac;
        }
      </style>
      <div style="border:1px solid black; padding:10px; margin:10px;">
          <p><b>Name:</b> ${q.studentName}</p>
          <p><b>Room:</b> ${q.Room}</p>
          <p><b>Query:</b> ${q.queryText}</p>

          <form action="/home/admin/delete/${q._id}" method="POST">
              <button type="submit">Delete</button>
          </form>
      </div>
    `;
    });

    html += `<a href="/home">Go Back</a>`;
    res.send(html);
});

// Delete query
app.post("/home/admin/delete/:id", async (req, res) => {
    const { id } = req.params;
    await Query.findByIdAndDelete(id);
    res.redirect("/home/admin");
});

// New notice form
app.get("/home/admin/newnotice", (req, res) => {
    res.send(`
    <h2>New Notice</h2>
    <form action="/home/admin/newnotice" method="POST">
      <textarea name="text" placeholder="Write notice..." required></textarea><br><br>
      <button type="submit">Upload Notice</button>
    </form>
    <a href="/home/admin">Back</a>
  `);
});

// Save notice
app.post("/home/admin/newnotice", async (req, res) => {
    const { text } = req.body;
    const newNotice = new Notice({ text });
    await newNotice.save();
    res.redirect("/home/admin");
});

/*
   HOSTEL
*/

app.get("/home/hostel", (req, res) => {
    res.send(`
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background-color: #040d87e2;
            font-family: 'Poppins', sans-serif;
            height: 100vh;
            overflow: hidden;
            background-image: url('IMG-20260206-WA0001.jpg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            position: relative;
        }
        
        /* Background Animation */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(75, 0, 130, 0.1), rgba(0, 255, 255, 0.1));
            animation: gradientShift 8s ease infinite;
            z-index: -2;
        }
        
        @keyframes gradientShift {
            0% { transform: translateX(-100%) translateY(-100%) rotate(0deg); }
            50% { transform: translateX(0%) translateY(0%) rotate(180deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(360deg); }
        }
        
        /* Parallax effect on scroll */
        .container {
            height: 100vh;
            overflow-y: auto;
            scroll-behavior: smooth;
        }
        
        /* Header with Profile */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 70px;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            z-index: 1000;
            box-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }
        
        .profile {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .profile img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: 3px solid #4b0ca8;
        }
        
        .profile-info h3 {
            color: white;
            font-size: 16px;
            font-weight: 600;
        }
        
        .profile-info p {
            color: #a0a0a0;
            font-size: 12px;
        }
        
        /* Main Content */
        .main-content {
            margin-top: 70px;
            padding: 50px;
            min-height: calc(100vh - 70px);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1;
        }
        
        .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            max-width: 1200px;
            width: 100%;
        }
        
        /* Option Cards */
        .option-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            border-radius: 20px;
            padding: 40px 30px;
            text-align: center;
            color: white;
            cursor: pointer;
            transition: all 0.4s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        .option-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: 0.6s;
        }
        
        .option-card:hover::before {
            left: 100%;
        }
        
        .option-card:hover {
            transform: translateY(-15px) scale(1.05);
            background: rgba(255, 255, 255, 0.25);
            box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        
        .option-icon {
            font-size: 60px;
            margin-bottom: 20px;
            display: block;
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.5));
        }
        
        .option-card h2 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .option-card p {
            font-size: 16px;
            opacity: 0.9;
            line-height: 1.5;
        }
        
        /* Specific Icons */
        .queries .option-icon { color: #4b0ca8; }
        .leave .option-icon { color: #00d4ff; }
        .notice .option-icon { color: #ff6b6b; }
        .attendance .option-icon { color: #4ecdc4; }
        
        /* Responsive */
        @media (max-width: 768px) {
            .header {
                padding: 0 20px;
                flex-direction: column;
                height: 90px;
                gap: 10px;
            }
            
            .main-content {
                padding: 20px;
                margin-top: 90px;
            }
            
            .dashboard {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .option-card {
                padding: 30px 20px;
            }
        }
        
        /* Scroll animations */
        .option-card {
            opacity: 0;
            transform: translateY(50px);
            animation: fadeInUp 0.8s ease forwards;
        }
        
        .option-card:nth-child(1) { animation-delay: 0.1s; }
        .option-card:nth-child(2) { animation-delay: 0.2s; }
        .option-card:nth-child(3) { animation-delay: 0.3s; }
        .option-card:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="profile">
                <img src="Photo.jpeg" alt="Profile">
                <div class="profile-info">
                    <h3>JATIN YADAV</h3>
                    <p>Room 65 | CSE 1st Year</p>
                </div>
            </div>
        </div>
        
        <div class="main-content">
            <div class="dashboard">
                <div class="option-card queries">
                    <i class="fas fa-question-circle option-icon"></i>
                    <h2>Queries</h2>
                    <p>Submit your queries and get quick responses from hostel administration</p>
                </div>
                
                <div class="option-card leave">
                    <i class="fas fa-calendar-check option-icon"></i>
                    <h2>Leave Application</h2>
                    <p>Apply for leave or outpass with easy approval tracking</p>
                </div>
                
                <div class="option-card notice">
                    <i class="fas fa-bell option-icon"></i>
                    <h2>Notices</h2>
                    <p>Stay updated with latest hostel announcements and circulars</p>
                </div>
                
                <div class="option-card attendance">
                    <i class="fas fa-clipboard-check option-icon"></i>
                    <h2>Attendance Record</h2>
                    <p>View your attendance history and download reports</p>
                </div>

                <div class="option-card Go_Back">
                    <i class="fa-solid fa-angle-left" style="font-size: 60px;"></i> <br><br>               
                    <h2>Go Back</h2>
                </div>
            </div>
        </div>
    </div>
    
    
    <script>
        // Smooth scrolling and parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.main-content');
        });
        
        // Card click handlers (placeholder)
        document.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', function() {
            });
        });
    </script>
    <script >
        document.querySelector('.notice').onclick = () => window.location.href = '/home/hostel/notice';
        document.querySelector('.attendance').onclick = () => window.location.href = '/home/hostel/attrecord';
        document.querySelector('.leave').onclick = () => window.location.href = '/home/hostel/leave';
        document.querySelector('.queries').onclick = () => window.location.href = '/home/hostel/query';
        document.querySelector('.Go_Back').onclick = () => window.location.href = '/home';
    </script>
</body>
  `);
});

// Query form
app.get("/home/hostel/query", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Submit Query</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background-color: #9296cbc9;
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  background-image: url('IMG-20260206-WA0001.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding-top: 90px;
  color: white;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 1000;
}

.profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 3px solid #4b0ca8;
}

.back-btn {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: 8px 18px;
  border-radius: 12px;
  text-decoration: none;
}

/* Container */
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.form-group { margin-bottom: 20px; }

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
}

input, textarea {
  width: 100%;
  padding: 12px 15px;
  border-radius: 12px;
  border: none;
  background: rgba(255,255,255,0.95);
  color: #333;
  font-size: 15px;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(45deg, #4b0ca8, #6a11cb);
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}
</style>
</head>

<body>

<div class="header">
  <div class="profile">
    <img src="Photo.jpeg" alt="Profile">
    <div>
      <h3 style="color:white;font-size:16px;">JATIN YADAV</h3>
      <p style="color:#aaa;font-size:12px;">Room 65 | Query Portal</p>
    </div>
  </div>

  <a href="/home/hostel" class="back-btn">
    <i class="fas fa-arrow-left"></i> Dashboard
  </a>
</div>

<div class="container">
  <div class="form-card">

    <h2 style="text-align:center;margin-bottom:25px;">
      <i class="fas fa-question-circle"></i> New Query
    </h2>

    <!-- ✅ IMPORTANT: Correct POST form -->
    <form action="/home/hostel/query" method="POST">

      <div class="form-group">
        <label>Full Name</label>
        <input type="text" name="studentName" value="JATIN YADAV" required>
      </div>

      <div class="form-group">
        <label>Room Number</label>
        <input type="number" name="Room" value="65" required>
      </div>

      <div class="form-group">
        <label>Describe your query</label>
        <textarea name="queryText" rows="5" placeholder="Type details here..." required></textarea>
      </div>

      <button type="submit" class="submit-btn">
        Submit to Office
      </button>

    </form>

  </div>
</div>

</body>
</html>
`);
});


// Save query
app.post("/home/hostel/query", async (req, res) => {
    const { studentName, Room, queryText } = req.body;

    try {
        const newQuery = new Query({ studentName, Room, queryText });
        await newQuery.save();

        res.send(`
      <style>
        body{
          background-color: #080e65ac;
        }
      </style>
      <h2 style="text-align:center;margin-top:50px;">
        Query Saved ✅
      </h2>
      <div style="text-align:center;">
        <a href="/home/hostel">Go Back</a>
      </div>
    `);

    } catch (err) {
        console.log(err);
        res.send("Error saving query");
    }
});

// Show notices
app.get("/home/hostel/notice", async (req, res) => {
    const notices = await Notice.find().sort({ createdAt: -1 });

    let noticeHTML = "";

    notices.forEach(n => {
        const date = new Date(n.createdAt).toDateString();

        noticeHTML += `
      <div class="notice-card">
          <div class="notice-header">
              <span class="date"><i class="far fa-calendar-alt"></i> ${date}</span>
          </div>
          <div class="notice-title">Hostel Notice</div>
          <div class="notice-desc">${n.text}</div>
      </div>
    `;
    });

    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Notices - Hostel Management</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
background-color: #9296cbc9;
font-family: 'Poppins', sans-serif;
min-height: 100vh;
background-image: url('IMG-20260206-WA0001.jpg');
background-size: cover;
background-position: center;
background-attachment: fixed;
color: white;
padding-top: 90px;
}
.header {
position: fixed; top: 0; left: 0; width: 100%; height: 70px;
background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(10px);
display: flex; align-items: center; justify-content: space-between;
padding: 0 30px; z-index: 1000;
}
.profile { display: flex; align-items: center; gap: 15px; }
.profile img { width: 45px; height: 45px; border-radius: 50%; border: 3px solid #ff6b6b; }
.back-btn {
background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3);
color: white; padding: 8px 15px; border-radius: 10px; text-decoration: none; transition: 0.3s;
}
.back-btn:hover { background: #ff6b6b; }

.container { max-width: 800px; margin: 0 auto; padding: 20px; }
.page-title { margin-bottom: 30px; text-align: center; }

.notice-card {
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(15px);
border-radius: 20px;
padding: 25px;
margin-bottom: 20px;
border-left: 6px solid #ff6b6b;
transition: transform 0.3s ease;
animation: fadeInUp 0.5s ease forwards;
}
.notice-card:hover { transform: scale(1.02); background: rgba(255, 255, 255, 0.2); }
.notice-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
.date { color: #ff6b6b; font-weight: 600; font-size: 14px; }
.notice-title { font-size: 20px; font-weight: 600; margin-bottom: 10px; }
.notice-desc { font-size: 14px; opacity: 0.9; line-height: 1.6; }

@keyframes fadeInUp {
from { opacity: 0; transform: translateY(20px); }
to { opacity: 1; transform: translateY(0); }
}
</style>
</head>

<body>

<div class="header">
<div class="profile">
<img src="Photo.jpeg" alt="Profile">
<div class="profile-info">
<h3 style="color: white; font-size: 16px;">JATIN YADAV</h3>
<p style="color: #a0a0a0; font-size: 12px;">Room 65 | Notice Board</p>
</div>
</div>
<a href="/home/hostel" class="back-btn"><i class="fas fa-arrow-left"></i> Dashboard</a>
</div>

<div class="container">
<div class="page-title">
<h1>Hostel Announcements</h1>
<p>Stay updated with the latest news</p>
</div>

${noticeHTML}

</div>

</body>
</html>`);
});

app.get("/home/hostel/leave", (req, res) => {
    res.send(`<style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            background-color: #9296cbc9;
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            background-image: url('IMG-20260206-WA0001.jpg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            padding-top: 90px;
            color: white;
        }

        .header {
            position: fixed; top: 0; left: 0; width: 100%; height: 70px;
            background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(10px);
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 30px; z-index: 1000;
        }
        
        .profile { display: flex; align-items: center; gap: 15px; }
        .profile img { width: 45px; height: 45px; border-radius: 50%; border: 3px solid #00d4ff; }
        
        .back-btn {
            background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3);
            color: white; padding: 8px 18px; border-radius: 12px; text-decoration: none; transition: 0.3s;
        }
        .back-btn:hover { background: #00d4ff; }

        .container { max-width: 850px; margin: 0 auto; padding: 20px 20px 50px 20px; }

        .form-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 25px;
            padding: 40px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .section-title {
            font-size: 18px; font-weight: 600; color: #00d4ff;
            margin: 25px 0 15px 0; border-bottom: 1px solid rgba(0, 212, 255, 0.3);
            padding-bottom: 5px;
        }

        .grid-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 13px; color: #eee; }
        
        input, select, textarea {
            width: 100%; padding: 12px; border-radius: 10px; border: none;
            background: rgba(255,255,255,0.95); color: #333; font-family: inherit; font-size: 14px;
        }

        .declaration-box {
            background: rgba(0,0,0,0.2); padding: 15px; border-radius: 12px;
            font-size: 12px; line-height: 1.6; margin: 20px 0; border: 1px solid rgba(255,255,255,0.1);
        }

        .submit-btn {
            width: 100%; padding: 16px; border-radius: 12px; border: none;
            background: linear-gradient(45deg, #00d4ff, #0072ff);
            color: white; font-weight: 600; cursor: pointer; transition: 0.3s; font-size: 16px;
        }
        .submit-btn:hover { box-shadow: 0 10px 25px rgba(0, 212, 255, 0.4); transform: translateY(-2px); }
    </style>
</head>
<body>
    <div class="header">
        <div class="profile">
            <img src="Photo.jpeg" alt="Profile">
            <div class="profile-info">
                <h3>JATIN YADAV</h3>
                <p>Room 65 | Leave Application</p>
            </div>
        </div>
        <a href="http://localhost:8000/home/hostel" class="back-btn"><i class="fas fa-arrow-left"></i> Dashboard</a>
    </div>

    <div class="container">
        <div class="form-card">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="font-size: 24px; letter-spacing: 1px;">DELTECH</h1>
                <p style="font-size: 14px; opacity: 0.8;">DELHI TECHNOLOGICAL UNIVERSITY</p>
                <p style="font-size: 12px; color: #00d4ff; font-weight: 600;">HOSTEL LEAVE FORM</p>
            </div>

            <form id="leaveForm">
                <div class="section-title">Personal Details</div>
                <div class="grid-row">
                    <div class="form-group">
                        <label>Name of Student</label>
                        <input type="text" value="JATIN YADAV" readonly style="background: rgba(255,255,255,0.6);">
                    </div>
                    <div class="form-group">
                        <label>Room No.</label>
                        <input type="text" value="65" readonly style="background: rgba(255,255,255,0.6);">
                    </div>
                </div>
                <div class="grid-row">
                    <div class="form-group">
                        <label>Mobile No. (Self)</label>
                        <input type="tel" placeholder="Your mobile number" required>
                    </div>
                    <div class="form-group">
                        <label>Course of Study</label>
                        <input type="text" value="CSE 1st Year" readonly style="background: rgba(255,255,255,0.6);">
                    </div>
                </div>

                <div class="section-title">Leave Schedule</div>
                <div class="grid-row">
                    <div class="form-group">
                        <label>Leave From (Date)</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Leave To (Date)</label>
                        <input type="date" required>
                    </div>
                </div>
                <div class="grid-row">
                    <div class="form-group">
                        <label>Date of Leaving Hostel</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Time of Leaving</label>
                        <input type="time" required>
                    </div>
                </div>
                <div class="grid-row">
                    <div class="form-group">
                        <label>Date of Returning</label>
                        <input type="date" required>
                    </div>
                    <div class="form-group">
                        <label>Time of Returning</label>
                        <input type="time" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Booking Details (Flight/Train/Bus No.)</label>
                    <input type="text" placeholder="Enter vehicle/flight number if applicable">
                </div>
                <div class="form-group">
                    <label>Reason for Leave</label>
                    <textarea rows="2" placeholder="Explain the reason for leave..." required></textarea>
                </div>

                <div class="section-title">Contact Person at Destination</div>
                <div class="grid-row">
                    <div class="form-group">
                        <label>Contact Name</label>
                        <input type="text" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <label>Relation</label>
                        <input type="text" placeholder="e.g., Uncle, Relative" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Mobile No.</label>
                    <input type="tel" placeholder="Active mobile number" required>
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" placeholder="Full destination address" required>
                </div>

                <div class="section-title">Parent/Guardian Information</div>
                <div class="grid-row">
                    <div class="form-group">
                        <label>Parent Name</label>
                        <input type="text" placeholder="Father/Mother Name" required>
                    </div>
                    <div class="form-group">
                        <label>Relation</label>
                        <select required>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Parent Mobile No.</label>
                    <input type="tel" placeholder="Parent's active number" required>
                </div>
                <div class="form-group">
                    <label>Parent Consent Received?</label>
                    <select required>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <button type="submit" class="submit-btn">Digitally Sign & Submit</button>
            </form>
        </div>
    </div>
</body>`);
});

app.get("/home/hostel/attrecord", (req, res) => {
    res.send(` <style>
        /* Reusing your Dashboard Theme */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background-color: #9296cbc9;
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            background-image: url('IMG-20260206-WA0001.jpg');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: white;
            padding-top: 90px;
        }
        .header {
            position: fixed; top: 0; left: 0; width: 100%; height: 70px;
            background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(10px);
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 30px; z-index: 1000;
        }
        .profile { display: flex; align-items: center; gap: 15px; }
        .profile img { width: 45px; height: 45px; border-radius: 50%; border: 3px solid #4ecdc4; }
        .back-btn {
            background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3);
            color: white; padding: 8px 15px; border-radius: 10px; text-decoration: none;
        }

        .container { max-width: 900px; margin: 0 auto; padding: 20px; }
        
        /* Attendance Stats */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .stat-box {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .stat-box h2 { font-size: 24px; color: #4ecdc4; }

        /* Calendar Styling */
        .calendar-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 25px;
            padding: 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .month-year { text-align: center; font-size: 22px; font-weight: 600; margin-bottom: 20px; }
        
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
        }
        .day-label { font-weight: 600; font-size: 14px; opacity: 0.7; padding: 10px 0; text-align: center; }
        .date-cell {
            aspect-ratio: 1/1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            background: rgba(255,255,255,0.05);
            font-weight: 500;
            position: relative;
            cursor: pointer;
            transition: 0.3s;
        }
        .date-cell:hover { background: rgba(255,255,255,0.2); }

        /* Status colors */
        .p { background: rgba(78, 205, 196, 0.4) !important; border: 1px solid #4ecdc4; } /* Present */
        .a { background: rgba(255, 107, 107, 0.4) !important; border: 1px solid #ff6b6b; } /* Absent */
        .l { background: rgba(255, 217, 61, 0.4) !important; border: 1px solid #ffd93d; } /* Leave */

        .legend {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 25px;
            font-size: 13px;
        }
        .legend-item { display: flex; align-items: center; gap: 8px; }
        .circle { width: 12px; height: 12px; border-radius: 50%; }
    </style>
</head>
<body>
    <div class="header">
        <div class="profile">
            <img src="Photo.jpeg" alt="Profile">
            <div class="profile-info">
                <h3>JATIN YADAV</h3>
                <p>Room 65 | Attendance</p>
            </div>
        </div>
        <a href="index.html" class="back-btn"><i class="fas fa-arrow-left"></i> Dashboard</a>
    </div>

    <div class="container">
        <div class="stats-grid">
            <div class="stat-box"><h2>26</h2><p>Present</p></div>
            <div class="stat-box"><h2>02</h2><p>Absent</p></div>
            <div class="stat-box"><h2>01</h2><p>Leave</p></div>
            <div class="stat-box"><h2>92%</h2><p>Total %</p></div>
        </div>

        <div class="calendar-card">
            <div class="month-year">February 2026</div>
            <div class="calendar-grid">
                <div class="day-label">Sun</div><div class="day-label">Mon</div><div class="day-label">Tue</div>
                <div class="day-label">Wed</div><div class="day-label">Thu</div><div class="day-label">Fri</div><div class="day-label">Sat</div>
                
                <div class="date-cell p">1</div><div class="date-cell p">2</div><div class="date-cell p">3</div>
                <div class="date-cell a">4</div><div class="date-cell p">5</div><div class="date-cell p">6</div>
                <div class="date-cell p">7</div><div class="date-cell l">8</div><div class="date-cell p">9</div>
                <div class="date-cell p">10</div><div class="date-cell p">11</div><div class="date-cell p">12</div>
                <div class="date-cell p">13</div><div class="date-cell p">14</div><div class="date-cell a">15</div>
                </div>

            <div class="legend">
                <div class="legend-item"><span class="circle" style="background: #4ecdc4;"></span> Present</div>
                <div class="legend-item"><span class="circle" style="background: #ff6b6b;"></span> Absent</div>
                <div class="legend-item"><span class="circle" style="background: #ffd93d;"></span> Leave</div>
            </div>
        </div>
    </div>
</body>`);
});

/* 
   MESS
 */

app.get("/home/mess", (req, res) => {
    res.send(`<h1>Mess</h1>`);
});

/*
   SERVER
*/

app.listen(PORT, () => {
    console.log("Listening on port 8000");
});
