const express = require("express");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const router = express.Router();
const isuserMiddleware = require("../middleware/isUser")

router.post("/signup",isuserMiddleware, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.create({
    username: username,
    password: password,
  })
    .then(() => {
      res.json({
        mesg: "User created successfully",
      });
    })
    .catch(() => {
      res.json({
        mesg: "Could not create user",
      });
    });
});
router.get("/courses", async (req, res) => {
  const allCourses = await Course.find({});
  res.json({
    course: allCourses,
  });
});

router.post("/courses/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;
  try {
    await User.updateOne(
      {
        username,
      },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );
    res.json({
      mesg: "Course purchased",
    });
  } catch (e) {
    console.log(e);
  }
});
router.get("/purchasedCourses", userMiddleware,async (req, res) => {
    const user = await User.findOne(
        {
            username : req.headers.username
        }
    )
    const courses = await Course.find({
        _id : {
            "$in" : user.purchasedCourses
        }
    });
    res.json({
        course : courses
    })
});

module.exports = router;
