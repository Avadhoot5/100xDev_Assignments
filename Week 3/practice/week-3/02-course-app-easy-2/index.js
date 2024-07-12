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
  const payload = {"username": admin.username};
  return jwt.sign(payload, adminSecretKey, { expiresIn: '1h' });
}

const adminVerify = (req, res, next) => {
  const auth = req.headers.Authorization;
  const token = auth.split(" ")[1];
  jwt.verify(token, adminSecretKey, (err, user) => {
    if (err) {
      res.status(403);
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
  const adminExists = ADMINS.find((a) => a.username === username);
  if (adminExists) {
    res.json("Admin already present");
  } else {
    ADMINS.push(admin);
    let token = adminJWt(admin);
    res.json({'message': 'User created successfully', 'token': token})
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
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
