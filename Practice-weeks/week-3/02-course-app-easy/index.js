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

const userAth = (req, res, next) => {
  const { username, password } = req.headers;
  const user = USERS.find((a) => a.username === username && a.password === password);
  if (user) {
    req.user = user;
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
  const { username, password } = req.body;
  const userExists = USERS.find((a) => a.username === username);
  if (userExists) {
    res.status(400).json({message: 'User already present'});
  } else {
    USERS.push({username, password, purchasedCourses: []});
    res.status(201).json({message: 'User created successfully'});
  }

});

app.post('/users/login', userAth, (req, res) => {
  // logic to log in user
  res.status(200).json({ message: 'Logged in successfully' });
  res.status(200).json({courses: COURSES});

});

app.get('/users/courses', userAth, (req, res) => {
  // logic to list all courses
  res.status(200).json({courses: COURSES});

});

app.post('/users/courses/:courseId', userAth, (req, res) => {
  // logic to purchase a course
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.findIndex((a) => a.id === courseId);
  
  if (course !== -1) {
    req.user.purchasedCourses.push(COURSES[course]);
    res.status(200).json({ message: 'Course purchased successfully'});
  } else {
    res.status(400).json({ message: 'Course ID not found'});
  }

});

app.get('/users/purchasedCourses', userAth, (req, res) => {
  // logic to view purchased courses
  if (req.user.purchasedCourses.length > 0) {
    res.status(200).json({purchasedCourses: req.user.purchasedCourses});
  } else {
    res.status(400).json({message: 'No purchased coursese'});
  }

});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
