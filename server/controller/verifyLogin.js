const { userModel } = require('../database/db');
const jwt = require('jsonwebtoken');

const verifyLogin = async (req, res) => {
  setTimeout(async()=>{
    try {
        const token = req.cookies.token;
        // console.log(token)
        if (!token) {
          return res.status(401).json({ message: "No token provided", flag: false });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded:", decoded);
        // Optional: check if user exists in DB
        const user = await userModel.findById(decoded.id,{_id:1,role:1,name:1});
        if (!user) {
          return res.status(404).json({ message: "User not found", flag: false });
        }
        return res.json({ message: "Authenticated",user, flag: true });
    
      } catch (err) {
        console.error("Auth Error:", err.message);
        return res.status(403).json({ message: "Unauthorized: Invalid or expired token", flag: false });
      }
  },1000)
};

module.exports = verifyLogin;