const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will continue on if the token is inside the local storage

module.exports = function (req, res, next) {
  // Get token from  request header
  const token = req.header("jwtToken");

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    /**
     * it is transforms to this format (that function jwtGenerator do):
      {
         user: {
            id: user_id,
          }
      }
     */

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verify.user;
    next();
  } catch (err) {
    // return that user in not authenticated
    res.status(401).json({ msg: "Token is not valid" });
  }
};
