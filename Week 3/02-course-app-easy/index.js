const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const port = 3000;

app.use(express.json());

const ADMINS = [];
const USERS = [];
const COURSES = [];


// Important - Add a middleware - authenticate the username and password, then sent them to below routes
const adminAuth = (req, res, next) => {
  const {username, password} = req.headers;
  const admin = ADMINS.find((a) => a.username === username && a.password === password);
  if (admin) {
    next();
  } else {
    res.status(403).send("Admin authorization failed");
  }
}

const userAuth = (req, res, next) =>{
  const {username, password} = req.headers;
  const user = USERS.find((a) => a.username === username && a.password === password);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(403).send("USER authorization failed");
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  let admin = req.body;
  let adminExists = ADMINS.find((a) => a.username === admin.username);
  if (adminExists) {
    res.status(403).send("Admin already present");
  } else {
    ADMINS.push(admin);
    res.send("Admin created successfully");    
  }
});

app.post('/admin/login', adminAuth, (req, res) => {
  // logic to log in admin
  res.send("Logged in successfully");
});

app.post('/admin/courses', adminAuth, (req, res) => {
  // logic to create a course
  let courseId = Math.floor(Math.random() * 10000);
  let course = req.body;
  course.id = courseId;
  COURSES.push(course);
  res.json({"message": "Course created successfully", "courseId": `${courseId}`})
});

app.put('/admin/courses/:courseId', adminAuth, (req, res) => {
  // logic to edit a course
  let courseId = req.params.courseId;
  let id = COURSES.find((a) => a.id === parseInt(courseId));
  if (id) {
    Object.assign(id, req.body);
    res.json({message: "Course updated successfully"});
  } else {
    res.status(403).json({message: "Course not found"});
  }
});

app.get('/admin/courses', adminAuth, (req, res) => {
  // logic to get all courses
    res.send(COURSES);
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user = {...req.body, purchasedCourses: []};
  // const user = {
  //   username: req.body.username,
  //   password: req.body.password,
  //   purchasedCourses: []
  // }
  let userExists = USERS.find((a) => a.username === user.username);
  if (userExists) {
    res.send("User already present");
  } else {
    USERS.push(user);
    res.send("User created successfully");
  }
});

app.post('/users/login', userAuth, (req, res) => {
  // logic to log in user
  res.send("Logged in successfully");
});

app.get('/users/courses', userAuth, (req, res) => {
  // logic to list all courses
  res.json({courses: COURSES.filter(c => c.published)});
});

app.post('/users/courses/:courseId', userAuth, (req, res) => {
  // logic to purchase a course
  let courseId = Number(req.params.courseId);
  let course = COURSES.find(c => c.id === courseId && c.published);
  if (course) {
    req.user.purchasedCourses.push(courseId);
    res.json({"message": 'Course purchased successfully'})
  } else {
    res.status(400).json("Course id not found");
  }
});

app.get('/users/purchasedCourses', userAuth, (req, res) => {
  // logic to view purchased courses
  var purchasedCourseIds = req.user.purchasedCourses; // array of purchased courses
  var purchasedCourse = [];
  for (let i = 0; i < COURSES.length; i++) {
    if (purchasedCourseIds.indexOf(COURSES[i].id) !== -1) {
      purchasedCourse.push(COURSES[i]);
    }
  }
  res.json({purchasedCourse})
});

app.listen(port, () => {
  console.log('Server is listening on port 3000 ');
});
