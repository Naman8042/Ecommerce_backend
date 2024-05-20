const User = require("../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.signup = async(req,res)=>{
    try{
      const {name,email,password} = req.body;
      
      const findEmail = await User.find({email:email})
      if(findEmail){
        const data = await User.create({name,email,password})
        return res.json({
            success:true,
            data:data
        })
      }
      else{
        return res.json({
          success:false,
          message:"email already exists"
      })
      }
    }
    catch(err){
        console.log(err)
        return res.json({
            success:false,
            message:"cannot create entry"
        })
    }
}
exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const payload = { email: user.email, id: user._id };

    if (user.password === password) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: false, 
        sameSite: 'None', 
      };

      res.cookie('token', token, options)
         .status(200)
         .json({ success: true, token, user, message: 'User logged in' });
    } else {
      return res.status(400).json({ success: false, message: 'Wrong password' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};