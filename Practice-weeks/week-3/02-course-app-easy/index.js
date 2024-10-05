const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuth = (req, res, next) => {
  const { username, password } = req.headers;
  const adminValid = ADMINS.find((a) => a.username === username && a.password === password);
  if (adminValid) {
    next();
  } else {
    res.status(401).json({message: 'Invalid credentials'});
  }
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
    res.status(201).json({message: 'Admin created successfully'});
  }

});

app.post('/admin/login', adminAuth, (req, res) => {
  // logic to log in admin
  res.status(200).json({ message: 'Logged in successfully' });
});

app.post('/admin/courses', adminAuth, (req, res) => {
  // logic to create a course
  const id = new Date().getTime();
  const courseAdd = {id, ...req.body};
  COURSES.push(courseAdd);
  res.status(201).json({message: 'Course created successfully', id: id});
});

app.put('/admin/courses/:courseId', adminAuth, (req, res) => {
  // logic to edit a course
  const courseId = parseInt(req.params.courseId);
  const courseExists = COURSES.findIndex((a) => a.id === courseId);

  if (courseExists !== -1 ) {
    let courseUpdated = {
      id: courseId,
      ...req.body
    }
    COURSES[courseExists] = courseUpdated;
    res.status(200).json({ message: 'Course updated successfully'});
  } else {
    res.status(400).json({ message: 'Course ID not found'});
  }

});

app.get('/admin/courses', adminAuth, (req, res) => {
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
