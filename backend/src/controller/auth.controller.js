const userModel = require('../models/auth.model')
const jwt = require('jsonwebtoken')
const tokenBlackListModel = require('../models/blackList.model')

async function userRegisterController(req, res){
  const {email, password, name} = req.body;

  const isExist = await userModel.findOne({
    email: email
  })

  if(isExist){
    return res.status(422).json({
      message : "User already exists with email",
      status : failed
    })
  }

  const user = await userModel.create({
    email, name, password
  })

  const token = jwt.sign(
    {userId : user._id},
    process.env.JWT_SECRET,
    {expiresIn: "3d"}
  )

  res.cookie("token", token);

  res.status(201).json({
    user:{
      _id : user._id,
      email: user.email,
      name: user.name
    },
    token
  })

}

/**
 * -User Login Controller
 * -POST /api/auth/login
 */

async function userLoginController(req, res){
  const {email, password} = req.body;

  const user = await userModel.findOne({email}).select("+password") // select used so that bcrypt can read it in userModel

  if(!user){
    return res.status(401).json({
      message: "User doesn't exists. Please Register"
    })
  }

  const isValidPassword = await user.comparePassword(password);

  if(!isValidPassword){
    return res.status(401).json({
      message : "Email or password is Invalid"
    })
  }

  const token = jwt.sign(
    {userId : user._id},
    process.env.JWT_SECRET,
    {
      expiresIn: "3d"
    }
  )

  res.cookie("token", token)

  res.status(200).json({
    user:{
      _id : user._id,
      email: user.email,
      name : user.name
    },
    token
  })
}

/**
 * -User Logout Controller
 * -POST /api/auth/logout
 */

async function userLogoutController(req, res){
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if(!token){
    return res.status(200).json({
      message: "User Logged Out Successfully"
    })
  }

  await tokenBlackListModel.create({
    token : token
  })

  res.clearCookie("token")

  res.status(200).json({
    message: "User Logged Out Successfully"
  })
}

module.exports = {userRegisterController,
  userLoginController, userLogoutController
}