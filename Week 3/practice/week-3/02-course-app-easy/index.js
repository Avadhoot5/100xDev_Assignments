const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuth = (req, res, next) => {
  const {username, password} = req.headers;
  const adminValid = ADMINS.find((a) => a.username === username && a.password === password);
  if (adminValid) {
    next();
  } else {
    res.status(400).send("Admin authorization failed");
  }
}

const userAuth = (req, res, next) => {
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
  const {username, password} = req.body;
  let adminExists = ADMINS.find((a) => a.username === username);
  if (adminExists) {
    res.json("Admin already present");
  } else {
    ADMINS.push({username, password});
    res.json('Admin created successfully');
  }
});

app.post('/admin/login', adminAuth, (req, res) => {
  // logic to log in admin
  res.send('Logged in successfully');
});

app.post('/admin/courses', adminAuth, (req, res) => {
  // logic to create a course
  const courseId = new Date().getTime();
  const course = {courseId, ...req.body};
  if (course) {
    COURSES.push(course);
    res.json({'message': 'Course created successfully', 'id': courseId});
  }
});

app.put('/admin/courses/:courseId', adminAuth, (req, res) => {
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

app.get('/admin/courses', adminAuth, (req, res) => {
  // logic to get all courses
  res.json(COURSES);
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user = {...req.body, purchasedCourses:[]}
  let userExists = USERS.find((a) => a.username === user.username);
  if (userExists) {
    res.json("User already present");
  } else {
    USERS.push(user);
    res.json('User created successfully');
  }
});

app.post('/users/login', userAuth, (req, res) => {
  // logic to log in user
  res.send('Logged in successfully');
});

app.get('/users/courses', userAuth, (req, res) => {
  // logic to list all courses
  res.json(COURSES);
});

app.post('/users/courses/:courseId', userAuth, (req, res) => {
  // logic to purchase a course
  const courseId = parseInt(req.params.courseId);
  const courseExits = COURSES.find((c) => c.courseId === courseId);
  if (courseExits) {
    req.user.purchasedCourses.push(courseId);
    res.json('Course purchased successfully');
  }
});

app.get('/users/purchasedCourses', userAuth, (req, res) => {
  // logic to view purchased courses
  let purchasedCourses =  req.user.purchasedCourses;
  let purchaseCourse = [];
  for (let i = 0; i < COURSES.length; i++) {
    if (purchasedCourses.indexOf(COURSES[i].courseId) !== -1) {
      purchaseCourse.push(COURSES[i]);
    }
  }
  if (purchaseCourse.length > 0) res.json(purchaseCourse);
  else res.json("no purchased courses");
});


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
