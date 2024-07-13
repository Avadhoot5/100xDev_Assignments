const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminSecretKey = 'adM1nSecret';
const userSecretKey = 'Us3RSecret';

const userJWT = (user) => {
  const payload = {username: user.username};
  return jwt.sign(payload, userSecretKey, { expiresIn: '1h' });
}

const adminJWT = (admin) => {
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

const userVerify = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth.split(" ")[1];
  jwt.verify(token, userSecretKey, (err, user) => {
    if (err) {
      return res.status(403).send("User authorization failed");
    } else {
      req.user = user;
      next();
    }
  })

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
    let token = adminJWT(admin);
    res.json({'message': 'Admin created successfully', 'token': token})
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const admin = req.headers;
  const adminExists = ADMINS.find((a) => a.username === admin.username);
  if (adminExists) {
    let token = adminJWT(admin);
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
  const user = req.body;
  const userExists = USERS.find((a) => a.username === user.username);
  if (userExists) {
    res.json("User already present");
  } else {
    USERS.push(user);
    let token = userJWT(user);
    res.json({'message': 'User created successfully', 'token': token})
  }
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  const user = req.headers;
  const userExists = USERS.find((a) => a.username === user.username);
  if (userExists) {
    let token = userJWT(user);
    res.json({'message': 'Logged in successfully', 'token': token})
  } else {
    res.status(403).json("User authorization failed");
  }
});

app.get('/users/courses', userVerify, (req, res) => {
  // logic to list all courses
  res.json(COURSES);
});

app.post('/users/courses/:courseId', userVerify, (req, res) => {
  // logic to purchase a course
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find((a) => a.courseId === courseId);
  if (!course) {
    res.send("Course ID not found");  
  } else {
    const user = USERS.find((a) => a.username === req.user.username);
    if (!user.purchasedCourses) {
      user.purchasedCourses = [];
    } else {
      user.purchasedCourses.push(course);
      res.json({'message': 'Course purchased successfully'});
    }
  }
});

app.get('/users/purchasedCourses', userVerify, (req, res) => {
  // logic to view purchased courses
  const user = USERS.find((a) => a.username === req.user.username);
  if (user && user.purchasedCourses.length > 0) {
    res.json({'purchasedCourses': user.purchasedCourses})
  } else {
    res.json('No purchased courses');
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
