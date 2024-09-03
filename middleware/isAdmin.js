const { Admin } = require("../db");

function isAdminMiddleware(req, res, next) {
  const { username } = req.body;

  Admin.findOne({ username })
    .then((admin) => {
      if (admin) {
        return res.json({
          mesg: "Admin already exists",
        });
      } else {
        next();
      }
    })
    .catch((error) => {
      // Handle any potential errors that might occur during the database query
      next(error); // Passes the error to the next error-handling middleware
    });
}

module.exports = isAdminMiddleware;
