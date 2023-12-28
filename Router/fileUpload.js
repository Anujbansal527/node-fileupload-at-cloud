const express = require("express");
const router = express.Router();

//handler function
const {localFileUpload, imageFileUploading, videoFileUploader, imageSizeReduce} = require("../Controller/fileuploadController"); 

//api route
router.post("/loacFileUpload",localFileUpload);
router.post("/imageUpload",imageFileUploading);
router.post("/videoUpload",videoFileUploader);
router.post("/compressImageUpload",imageSizeReduce);

module.exports=router;