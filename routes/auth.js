const express = require("express");
const bcrypt =require("bcryptjs");
var jwt=require("jsonwebtoken")
// User that reuire below is not a User.js file it is just module .. that require from User.js file
const User = require("../model/User");
const router = express.Router();
const MY_SECRET_KEY="IAMMUBEENIAMA$OODBOY"
//middleware that authenticate user through its token
const fetchuser=require('../middleware/fetchuser')

let Success=false;

//   1 route of api/auth/createuser
router.post("/createuser", async (request, response) => {
  // make this post request to get request to display the above 2 lines code
  // console.log("hello from auth backend path")
  // response.send("from auth backend path")

try {
  let user= await User.findOne({email:request.body.email})
  if(user){
    return response.status(400).json({error: "sorry a user already exist with this email"})
  }
 const salt= await bcrypt.genSalt(10)
 const secpass=await bcrypt.hash(request.body.password,salt)

  // user.create also save user in database
  user=await User.create({
    name:request.body.name,
    email:request.body.email,
    password:secpass
  })

  const data={
    user:{
      id:user.id
    }
  }

  const authtoken =await jwt.sign(data,MY_SECRET_KEY)
Success=true;
response.json({Success,authtoken})

} 
catch (error) {
console.log("error in api/auth.createuser" + error)
  
}

});
//   2 route of api/auth/login
router.post("/login",async (request,response)=>{
  const{email,password}=request.body
  try {
    const user= await User.findOne({email:email})
    if(!user){
      return response.status(400).json({error:"try to login with correct credential"})
    }
    const passwordCompare= await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      return response.status(400).json({error:"try to login with correct credential"})
    }
    const data={
      user:{
        id:user.id
      }
    }

    const authtoken=await jwt.sign(data,MY_SECRET_KEY)
    Success=true;
    response.send({Success,authtoken})
  } catch (error) {
    console.log("error in api/auth/login"+error)
  }
})
//   3 route of api/auth/login
router.post('/getuser',fetchuser, async (request,response)=>{
  try {
    const userId =request.user.id
    const fnluser = await User.findById(userId).select("-password")
    response.send(fnluser)
  } catch (error) {
    console.log("error in api/auth/getuser"+error)
  }
})





module.exports = router;
