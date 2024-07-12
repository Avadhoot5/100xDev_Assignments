const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminSecretKey = 'adM1nSecret';
const userSecretKey = 'Us3RSecret';

const userVerify = (user) => {
  const payload = user;
  return jwt.sign(payload, userSecretKey, { expiresIn: '1h' });
}

const adminJWt = (admin) => {
  const payload = {username: admin.username};
  return jwt.sign(payload, adminSecretKey, { expiresIn: '1h' });
}

const adminVerify = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth.split(" ")[1];
  jwt.verify(token, adminSecretKey, (err, user) => {
    if (err) {
      return res.status(403).send("Admin authorization failed");
    } else {
      req.user = user;
      next();
    }
  })
}

const userJWT = (req, res, next) => {
  const {username, password} = req.headers;
  const user = USERS.find((a) => a.username === username && a.password === password);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(400).send("User authorization failed");
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  const adminExists = ADMINS.find((a) => a.username === admin.username);
  if (adminExists) {
    res.json("Admin already present");
  } else {
    ADMINS.push(admin);
    let token = adminJWt(admin);
    res.json({'message': 'Admin created successfully', 'token': token})
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const admin = req.headers;
  const adminExists = ADMINS.find((a) => a.username === admin.username);
  if (adminExists) {
    let token = adminJWt(admin);
    res.json({'message': 'Logged in successfully', 'token': token})
  } else {
    res.status(403).json("Admin authorization failed");
  }
});

app.post('/admin/courses', adminVerify, (req, res) => {
  // logic to create a course
  const courseId = new Date().getTime();
  const course = {courseId, ...req.body};
  if (course) {
    COURSES.push(course);
    res.json({'message': 'Course created successfully', 'id': courseId});
  }
});

app.put('/admin/courses/:courseId', adminVerify, (req, res) => {
  // logic to edit a course
  const courseId = parseInt(req.params.courseId);
  const courseUpdate = {...req.body};
  const course = COURSES.find((c) => c.courseId === courseId);
  if (course) {
    Object.assign(course, courseUpdate);
    res.json('Course updated successfully');
  } else {
    res.send("course id not found");
  }
});

app.get('/admin/courses', adminVerify, (req, res) => {
  // logic to get all courses
  res.json(COURSES);
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
