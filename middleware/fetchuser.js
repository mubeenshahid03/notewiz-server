const jwt=require("jsonwebtoken")
const MY_SECRET_KEY=process.env.MYSECRETKEY;


const fetchuser =(request,response,next)=>{
// when we use jwt verify it decode data .Try to remember those user object that conatin user id that you add in auth token when user login 
    const token=request.header("auth-token")
    if(!token){
         return response.status(401).json({error:"try to login with correct credential"})
    }
    const decodedata =jwt.verify(token,MY_SECRET_KEY)
    
    // const data={
    //     user:{
    //       id:user.id
    //     }
    //   }this user object that contain id in request.user
    request.user=decodedata.user
next()
}
module.exports=fetchuser