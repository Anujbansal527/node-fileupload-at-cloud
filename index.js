const express = require("express");
const app = express();

//adding dotenv config
require("dotenv").config();

//adding port from dotenv file
const PORT = process.env.PORT || 4000 ;

//using json decoding middileware
app.use(express.json());

//middile ware for file uploading
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir:"/temp/"
}));

//connecting to database
const Database = require("./Config/database");
Database();

//connecting to cloud fileuploading
const cloudinary = require("./Config/Cloudinary2");
cloudinary.cloudinaryConnect();

//adding api routes
const Upload = require("./Router/fileUpload");
app.use("/api/v1/upload",Upload);

//creating server
app.listen(PORT, ()=>{
    console.log(`server start at ${PORT}`);
})

//default route 
app.get("/",(req,res) =>
{
    res.send("This is default page");
});