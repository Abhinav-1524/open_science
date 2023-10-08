const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      try {
        const user = await User.findById(data.id);
        if (user) {
          return res.json({ status: true, username: user.username, userType: user.userType });
        } else {
          return res.json({ status: false });
        }
      } catch (error) {
        console.error(error);
        return res.json({ status: false });
      }
    }
  });
};