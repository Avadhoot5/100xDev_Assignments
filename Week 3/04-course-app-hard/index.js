const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const secretKey = "seC3et";

// Define mongoose schema

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
})

// Define mongoose models

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

// Auth Token
const authVerify = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).send("Admin/User authorization failed");
      }
      req.user = user;
      next();
    })
  } else {
    res.status(403).send();
  }
}

// Connect to MongoDB
// mongoose.connect('mongoDBURL')

// Testing server on home route
app.get('/', (req, res) => {
  res.send(`<html>
            <body style = "background-color: black">
            <p style = "color: white">Hello Site is working!</p>
            </body>
            </html> `);
})

// Admin routes
app.post('/admin/signup', async (req, res) => {
  // logic to sign up admin
  const {username, password} = req.body;
  const admin = await Admin.findOne({username});
  if (admin) {
    res.status(403).json("Admin already exists");
  } else {
    const newAdmin = new Admin({username, password});
    await newAdmin.save();
    const token = jwt.sign({username, role: 'admin'}, secretKey, {expiresIn: '1h'});
    res.status(200).json({"message": 'Admin created successfully', "token": token});
  }
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  const {username, password} = req.headers;
  const admin = await Admin.findOne({username, password});
  if (admin) {
    const token = jwt.sign({username, role: 'admin'}, secretKey, {expiresIn: '1h'})    
    res.status(200).json({"message": 'Logged in successfully', "token": token});
  } else {
    res.status(403).json("Admin authorization failed");
  }
});

app.post('/admin/courses', authVerify, async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  await course.save();
  res.json({message: "Course created successfully", courseId: course.id});
});

app.put('/admin/courses/:courseId', authVerify, async (req, res) => {
  // logic to edit a course
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body);
  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(403).json("Course not found");
  }
});

app.get('/admin/courses', authVerify, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json(courses);
});

// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
  const {username, password} = req.body;
  const user = await User.findOne({username});
  if (user) {
    res.status(403).json("User already exists");
  } else {
    const newUser = new User({username, password});
    await newUser.save();
    const token = jwt.sign({username, role: 'user'}, secretKey, {expiresIn: '1h'});
    res.status(200).json({"message": 'User created successfully', "token": token}); 
  }
});

app.post('/users/login', async (req, res) => {
  // logic to log in user
  const {username, password} = req.headers;
  const user = await User.findOne({username, password});
  if (user) {
    const token = jwt.sign({username, role: 'user'}, secretKey, {expiresIn: '1h'});
    res.status(200).json({"message": 'Logged in successfully', "token": token});
  } else {
    res.status(403).json("User auth failed");
  }
});

app.get('/users/courses', authVerify, async (req, res) => {
  // logic to list all courses
  const courseList = await Course.find({published: true});
  res.json(courseList);
});

app.post('/users/courses/:courseId', authVerify, async (req, res) => {
  // logic to purchase a course
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({username: req.user.username});
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: 'Course purchased successfully' });
    } else {
      res.status(403).json("User not found");
    }
  } else {
    res.status(404).json("Course not found");
  }
});

app.get('/users/purchasedCourses', authVerify, async (req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({username: req.user.username}).populate("purchasedCourses");
  if (user) {
    res.json({"purchasedCourses": user.purchasedCourses || []});
  } else {
    res.status(403).json("User not found");
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
