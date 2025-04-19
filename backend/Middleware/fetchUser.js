const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const token = req.header("token");
  if (!token) res.status(401).send({ success: false, message: "Please authenticate with valid toke.", status: 400, result: "" });
    
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({success:false, message:`Error: Internal server error occur.`, status:400, result:error.message });
  }
};

module.exports = fetchUser;