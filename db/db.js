const mongoose= require ('mongoose')
const mongooseURI=process.env.DATABASE
const connectToMongoose=()=>{
mongoose.connect(mongooseURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connection successfull')
}).catch((error)=>console.log('connection failed!'))
}

module.exports=connectToMongoose