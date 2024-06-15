const express=require("express")
const ejs=require("ejs")
const app=express()
const bodyParser = require('body-parser')
const flash = require('connect-flash');
app.use(flash());
const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000 }
  }))
app.use(bodyParser.urlencoded({ 
    limit:"50mb",
    extended: true,
parameterLimit:50000 }))

app.use(bodyParser.json({limit:"50mb"}))

const dotenv=require("dotenv")
dotenv.config()
const MongodbConnection=require("./Config/Database")
MongodbConnection()
// -----------Views-----------//
app.set("view engine","ejs")
app.set("views","views")
// -------------Image---------------//
app.use("/uploads",express.static("uploads"))
// --------------------ImageRouter----------------//
const ImageRouter=require("./Route/WebRouter")
app.use(ImageRouter)


const port=3535
app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`);
})
