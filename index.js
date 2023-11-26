const express = require("express"); 
const dotenv=require("dotenv")
var cors = require("cors") 
const app = express();

//attach the path of config.env file
dotenv.config({ path: './config.env' })



const port = process.env.PORT
const connectToMongoose = require("./db/db");
//for converting data format to json format
app.use(cors());
app.use(express.json());
connectToMongoose();


//backend routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));
//handle CORS error

//backend main page
app.get("/", (request, response) => {
  response.send("Hello World from main page!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
