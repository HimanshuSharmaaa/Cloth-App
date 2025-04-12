const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const { body, validationResult } = require("express-validator");

// Admin Login route
router.post("/",
  [
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password", "Password must be atleast 4 characters.").isLength({min: 4}),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      let { email } = req.body;
      const user = await User.findOne({ where: { email } , attributes: ["roleId", "name", "password"] });
      if (!user) return res.status(400).json({success: false, message: `Error: The email ${email} is not registered.`, status: 400, result: ""});

      // Verify token with the user sent password and user stored password in db
      const token = await bcrypt.compare(req.body.password, user.password);
      if (!token) return res.status(400).json({success: false, message: "The Password Not Matched.", status: 400, result: ""});

      const data = {
        user: {
          id: user.id,
        },
      };

      // Check Admin or Not   
      if(user.roleId == 1) return res.status(400).json({success: false,message: "Access denied. You do not have the necessary permissions to perform this action. Please contact an administrator if you believe this is an error." ,status: 400,result: ""});

      // Generating JWT authentication token from user.id and secret key.
      const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);

      // send user to successfully login.
      res.json({success: true, message: `Welcome Back ${user.name}.`, status: 200, result: authToken});
    } catch (error) {
      console.log(error);
      res.status(500).send({success: false, message: `Error: Internal server error occur.`, status: 400, result: error.message});
    }
  }
);

module.exports = router;