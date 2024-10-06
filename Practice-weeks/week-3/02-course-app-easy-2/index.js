const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const SECRET_KEY = 'hell3oKey';

const adminVerify = (req, res, next) => {
  const data = req.headers.authorization;
  if (!data) {
    res.status(400).json({message: 'Authorization token missing in header' })
  }

  const token = data.split(' ')[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, admin) => {
      if (admin) {
        const adminValid = ADMINS.find((a) => a.username === admin.username);
        if (adminValid) {
          req.admin = admin;
          next();
        }
      } else {
        res.status(400).json({message: 'Authorization failed' })
      }
    })
  }
  if (!token) return res.status(400).json({message: 'Please provide auth token'});
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const adminExists = ADMINS.find((a) => a.username === username);
  if (adminExists) {
    res.status(400).json({message: 'Admin already present'});
  } else {
    ADMINS.push({username, password});
    const token = jwt.sign( {username: username}, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({message: 'Admin created successfully', token: token});
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const adminValid = ADMINS.find((a) => a.username === username && a.password === password);
  if (adminValid) {
    const token = jwt.sign( {username: username}, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({message: 'Logged in successfully', token: token});
  } else {
    res.status(401).json({message: 'Invalid credentials'});
  }
});

app.post('/admin/courses', adminVerify, (req, res) => {
  // logic to create a course
  const id = new Date().getTime();
  const course = {id, ...req.body};
  COURSES.push(course);
  res.status(201).json({ message: 'Course created successfully', courseId: id });
});

app.put('/admin/courses/:courseId', adminVerify, (req, res) => {
  // logic to edit a course
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.findIndex((a) => a.id === courseId);
  if (course !== -1) {
    const updatedCourse = {courseId, ...req.body};
    COURSES[course] = updatedCourse;
    res.status(200).json({ message: 'Course updated successfully' });
  } else {
    res.status(400).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', adminVerify, (req, res) => {
  // logic to get all courses
  res.status(200).json({courses: COURSES});
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
