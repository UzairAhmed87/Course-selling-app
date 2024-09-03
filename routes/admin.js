const express = require("express")
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router()
const isAdminMiddleware = require("../middleware/isAdmin")

router.post("/signup",isAdminMiddleware,(req,res)=>{
const username = req.body.username;
const password = req.body.password;

Admin.create({
    username : username,
    password : password

})
.then(()=>{
res.json({
    mesg : "Admin created successfully"
})
}).catch(()=>{
    res.json({
        mesg : "Could not create Admin"
    })
})

})

router.post("/courses",adminMiddleware,async(req,res)=>{
const title = req.body.title;
const description = req.body.description;
const price = req.body.price;
const imageLink = req.body.imageLink;

const newCourse = await Course.create({
    title,
    description,
    price,
    imageLink
})
res.json({
    mesg : "Course created successfully",
    courseId : newCourse._id
})
})

router.get("/courses",adminMiddleware,async(req,res)=>{
const allCourses = await Course.find({})
res.json({
    course : allCourses
})
})

module.exports = router