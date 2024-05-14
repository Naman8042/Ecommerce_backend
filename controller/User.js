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
exports.Login = async (req,res)=>{
  try{
    const {username,password} = req.body;
    const user = await User.findOne({username})
    const payload = {
      email:user.email,
      id:user._id,
  
    }

    if(user.password == password){
      let token = jwt.sign(payload,process.env.JWT_SECRET,{
          expiresIn:"2h",
      })
      user.token = token
      user.password = undefined
      const options = {
               expired :new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 ),
               httpOnly:true,
      }
      res.cookie("token",token,options).status(200).json({
          success:true,
          token,
          user,
          message:"user loggen in"
      })
    }
    else{
      return res.status(400).json({
          success:true,
          message:'wrong password'
      })
    }

  }
  catch(err){
   console.log(err);
   return res.status(200).json({
      message:"user cannot found",
      success:false
     })
  }
}