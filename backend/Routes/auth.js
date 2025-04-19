const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fetchUser = require('../Middleware/fetchUser');
const { body, validationResult } = require("express-validator");

// Create User
router.post("/create",
  [
    body("name","Enter a valid name").isLength({ min: 3 }),
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password","Password must be atleast 4 characters.").isLength({min: 4}),
  ],
  async (req, res) => {
    try {
      // check any error occured
      const errors = validationResult(req);
      // check req.body.email is empty or not
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      // check E-mail is already registered or not
      let { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user) return res.status(400).json({success: false,message: `Error: The email ${email} is already registered.`,status: 400,result: ""});

      // Generating salt and convert hash of the password and salt.
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      // create new User when email is unique.
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
        roleId:1
      });

      // retreive the user.id to search uniquely in the db.
      const data = {
        user: {
          id: newUser.id,
        },
      };

      // Generating JWT authentication token from user.id and secret key.
      const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);

      // send user to successfully login.
      res.json({success:true,message:`Successfully login in Cloth-App.`,status: 200,result:authToken});
    } catch (error) {
      console.log(error);
      res.status(500).send({success:false,message:`Error: Internal server error occur.`,status:400,result:error.message});
    }
  }
);

// LoginUser
router.post('/login',
  [
    body("email").isEmail().withMessage("Not a valid e-mail address"),
    body("password","Password must be atleast 4 characters.").isLength({min: 4}),
  ],
  async(req,res) => {
    try {
      // check any error occured
      const errors = validationResult(req);
      // check req.body.email is empty or not
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      // check E-mail is already registered or not
      let { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({success: false,message: `Error: The email ${email} is not registered.`,status: 400,result: ""});
      
      // Verify token with the user sent password and user stored password in db
      const token = await bcrypt.compare(password, user.password);
      if (!token) return res.status(400).json({ success:false, message:'The Password Not Matched.', status:400, result:""});

      const data = {
        user: {
          id: user.id,
        },
      };

      // Generating JWT authentication token from user.id and secret key.
      const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);
      // send user to successfully login.
      res.json({success:true, message:`Successfully login in Cloth-App.`, status:200, result:authToken});

    } catch (error) {
      console.log(error);
      res.status(500).send({success:false,message:`Error: Internal server error occur.`,status:400,result:error.message
      });
    }
  }
)

// Router : 3 Get user info
router.get('/', fetchUser, async(req,res)=>{
  try {
    const userInfo = await User.findByPk(req.user.id);
    if(!userInfo) return res.status(404).json({ success: false, message: 'User not found', status: 404 });
    res.json({ success: true, message: 'UserInfo Fetched Successfully.', status: 200, result:userInfo});
  } catch (error) {
    console.log(error);
    res.status(500).send({success: false, message: 'Error: Internal server error occur.', status: 400, result: error.message
    });
  }
})

module.exports = router;