const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const {Admin, User, Course} = require('./database');
const jwt = require('jsonwebtoken');

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database Connected'))
  .catch((error) => console.log('Not connected'));

// middleware 

const authVerify = (req, res, next) => {
  const payload = req.headers.authorization;

  if (!payload) {
    res.status(400).json({message: 'Token missing'})
  }

  const token = payload.split(' ')[1];
  
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) return res.status(404).json({message: 'Authentication failed'});
      if (user) {
        req.user = user;
        next();
      }
      else res.status(400).send();
    })
  }
}

// Admin routes
app.post('/admin/signup', async (req, res) => {
  // logic to sign up admin
  const {username, password} = req.body;
  const admin = await Admin.findOne({username});
  if (admin) {
    return res.status(404).json({message: 'Admin already present'});
  }
  if (!admin) {
    const newAdmin = new Admin({username, password});
    await newAdmin.save();
    const token = jwt.sign({username, role: 'admin'}, process.env.SECRET, {expiresIn: '1h'});
    res.status(200).json({message: 'Admin created sucessfully', token: token});
  }
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const admin = await Admin.findOne({username, password});
  if (!admin) {
    return res.status(404).json({message: 'Incorrect credentials'});
  }
  if (admin) {
    const token = jwt.sign({username, role: 'admin'}, process.env.SECRET, {expiresIn: '1h'});
    res.status(200).json({message: 'Admin created sucessfully', token: token});
  }
});

app.post('/admin/courses', authVerify, async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  await course.save()
  return res.status(200).json({message: 'Course created sucessfully', id: course._id}); 
});

app.put('/admin/courses/:courseId', authVerify, async (req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate({_id: req.params.courseId}, req.body);
  if (course) {
    return res.status(200).json({message: 'Course Updated Sucessfully!'});
  } else {
    return res.status(403).json({message: 'Course not found'});
  }
});

app.get('/admin/courses', authVerify, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  return res.status(200).json(courses);
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
