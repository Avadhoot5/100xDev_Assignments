const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Testing server
app.get('/', (req, res) => {
  res.send(`<html>
            <body style = "background-color: black">
            <p style = "color: white">Hello Site is working!</p>
            </body>
            </html> `);
})

// Admin Secret Key 

const adminSecretKey = "ke2ySecretAdmin";

// User Secret Key 
const userSecretKey = "ke2ySecretAdmin";

// Admin Auth Token
const adminJWt = (user) => {
  const payload = {username: user.username};
  return jwt.sign(payload, adminSecretKey, {expiresIn: '1h'});
}

// User Auth Token
const userJWT = (user) => {
  const payload = {username: user.username};
  return jwt.sign(payload, userSecretKey, {expiresIn: '1h'});
}

// Validate Admin Token
const adminVerify = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(' ')[1];
    jwt.verify(token, adminSecretKey, (err, user) => {
      if (err) {
        return res.status(403).send("Admin authorization failed");
      }
      req.user = user;
      next();
    })
  } else {
    res.status(403).send();
  }
}

// Validate User Token
const userVerify = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(' ')[1];
    jwt.verify(token, userSecretKey, (err, user) => {
      if (err) {
        return res.status(403).send("User authorization failed");
      }
      req.user = user;
      next();
    })
  } else {
    res.status(403).send();
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  const existingAdmin = ADMINS.find((a) => a.username === admin.username);
  if (existingAdmin) {
    res.status(403).json("Admin already exists");
  } else {
    const token = adminJWt(admin);
    ADMINS.push(admin);
    res.status(200).json({"message": 'Admin created successfully', "token": token});
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const admin = req.headers;
  const isAdminValid = ADMINS.find((a) => a.username === admin.username && a.password === admin.password);
  if (isAdminValid) {
    const token = adminJWt(admin);
    res.status(200).json({"message": 'Logged in successfully', "token": token});   
  } else {
    res.status(403).json("Admin authorization failed");
  }
});

app.post('/admin/courses', adminVerify, (req, res) => {
  // logic to create a course
  const course = req.body;
  const courseId = Date.now();
  course.id = courseId;
  COURSES.push(course);
  res.json({message: "Course created successfully", courseId: courseId });
});

// - PUT /admin/courses/:courseId
// Description: Edits an existing course. courseId in the URL path should be replaced with the ID of the course to be edited.
// Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, 
// Body: { title: 'updated course title', description: 'updated course description', price: 100, imageLink: 'https://updatedlinktoimage.com',
//  published: false }
// Output: { message: 'Course updated successfully' }

app.put('/admin/courses/:courseId', adminVerify, (req, res) => {
  // logic to edit a course
  const id = parseInt(req.params.courseId);
  const courseIndex = COURSES.findIndex((c) => c.id === id);
  if (courseIndex > -1) {
    console.log(courseIndex);
    const updateCourse = { ...COURSES[courseIndex], ...req.body};
    COURSES[courseIndex] = updateCourse;
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(403).json("Course not found");
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
  const existingUser = USERS.find((a) => a.username === user.username);
  if (existingUser) {
    res.status(403).json("User already exists");
  } else {
    const token = userJWT(user);
    USERS.push(user);
    res.status(200).json({"message": 'User created successfully', "token": token});
  }
});

// - POST /users/login
app.post('/users/login', (req, res) => {
  // logic to log in user
  const user = req.headers;
  const isUserValid = USERS.find((a) => a.username === user.username && a.password === user.password);
  if (isUserValid) {
    const token = userJWT(user);
    res.status(200).json({"message": 'Logged in successfully', "token": token});   
  } else {
    res.status(403).json("User authorization failed");
  }
});

app.get('/users/courses', userVerify, (req, res) => {
  // logic to list all courses
  res.json({courses: COURSES});
});

app.post('/users/courses/:courseId', userVerify, (req, res) => {
  // logic to purchase a course
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find((c) => c.id === courseId);
  if (course) {
    const user = USERS.find((a) => a.username === req.user.username);
    if (!user.purchasedCourses) {
      user.purchasedCourses = [];
    }
    user.purchasedCourses.push(course);
    res.json({ message: 'Course purchased successfully' });
  } else {
    res.status(400).json("Course not found");
  }
});

// - GET /users/purchasedCourses
// Description: Lists all the courses purchased by the user.
// Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
// Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

app.get('/users/purchasedCourses', userVerify, (req, res) => {
  // logic to view purchased course
  const user = USERS.find(a => a.username === req.user.username);
  if (user && (user.purchasedCourses.length > 0)) {
    res.json({purchasedCourses: user.purchasedCourses});
  } else {
    res.json("No purchased courses");
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
