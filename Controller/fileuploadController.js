const File = require("../Models/file");
const { options } = require("../Router/fileUpload");

//importing cloudinary
const cloudinary = require("cloudinary").v2;


//localfileupload handeler
exports.localFileUpload = async (req,res) =>{
    try
    {   
        //fetching file
        const file = req.files.file;
        console.log("Getting file :",file);

        let path = __dirname + "/Files/" + Date.now() + `.${file.name.split('.')[1]}`;
                    //curent directory  //current date in binary //fetcing extention and meri=ging


        //moving file to File directory to save that file to server
        file.mv(path , (err) =>{
            console.log(err);
        })

        res.json({
            sucess:true,
            message:"Local file Upload Sucess"
        })
    }   
    catch(error)
    {
        console.log(error);
    }
}


//creating funtion to check type of the file
function isFileTypeSupport (type,supportType)
{
     return supportType.includes(type);
}

//creaing funstion to upload file into cloudinary
async function uploadFileAtCloud(file,folder,quality)
                       //file fetched //folder in cloud //compressing quality
{
    //creating options
    const option = {folder};
                                //local uploaded file //cloud folder
    //code for compressing file
    if(quality)
    {
        option.quality = quality;
    }
    
    console.log(file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath,option)
}


//image uploading handler
exports.imageFileUploading = async (req,res) =>
{
    try
        {
            //fetching data from server
            const {name,tags,email} = req.body;
            console.log(name,tags,email);

            const file=req.files.imagefile;
            console.log(file);

            //validation
            const supportType = ["jpg","jpeg","png"];

            //fetching file extention and converting to lowercase to full fill condition
            const fileType = file.name.split('.')[1].toLowerCase();
            console.log("filename " , fileType)
            
            
            //checking is file formate is suported or not
            if(!isFileTypeSupport(fileType,supportType))
            {
                return res.status(401).json({
                    success : false,
                    message:"file formate not matched"
                })
            }

            //if file formate supports
            const response = await uploadFileAtCloud(file,"Server")
                                    //file name we fetched ,//cloud folder name 

           //stroing data into our database
            const fileData = await File.create({
                name,
                tags,
                email,
                imageUrl:response.secure_url,
            })

            //sending res to server to sucessfully uploading file
            res.json({
                sucess:true,
                imageUrl:response.secure_url,
                message:"Sucessfully file uploaded to Cloud"
            })
        }
    catch(error)
        {
            console.log(error);
            res.status(400).json({
                status : false,
                message:`"Something went wrong" ${error}`
            })
        }
}


//video  uploading handler
exports.videoFileUploader = async (req,res) => {
    
    
    try
    {
    //fetching data from server
    const {name,tags,email} = req.body;
    console.log(name,tags,email);

    const file=req.files.videofile;
    console.log(file);

    //validation
    const supportType = ["mp4","mkv","mov"];

    //fetching file extention and converting to lowercase to full fill condition
    const fileType = file.name.split('.')[1].toLowerCase();
    console.log("filename " , fileType)
    
    
    //checking is file formate is suported or not
    if(!isFileTypeSupport(fileType,supportType))
    {
        return res.status(401).json({
            success : false,
            message:"file formate not matched"
        })
    }

    //if file formate supports
    const response = await uploadFileAtCloud(file,"Server")
                            //file name we fetched ,//cloud folder name 

   //stroing data into our database
    const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,
    })

    //sending res to server to sucessfully uploading file
    res.json({
        sucess:true,
        imageUrl:response.secure_url,
        message:"Sucessfully file uploaded to Cloud"
    })
}
catch(error)
{
    console.log(error);
    res.status(400).json({
        status : false,
        message:`"Something went wrong" ${error}`
    })
}
}


//image size rducer

exports.imageSizeReduce =  async (req,res) => {
    try
    {
        //fetching data from server
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file=req.files.compImage;
        console.log(file);

        //validation
        const supportType = ["jpg","jpeg","png"];

        //fetching file extention and converting to lowercase to full fill condition
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("filename " , fileType)
        
        
        //checking is file formate is suported or not
        if(!isFileTypeSupport(fileType,supportType))
        {
            return res.status(401).json({
                success : false,
                message:"file formate not matched"
            })
        }

        //if file formate supports
        const response = await uploadFileAtCloud(file,"Server",30)
                                //file name we fetched ,//cloud folder name //3rd parameter show the value of quality 

       //stroing data into our database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        //sending res to server to sucessfully uploading file
        res.json({
            sucess:true,
            imageUrl:response.secure_url,
            message:"Sucessfully file uploaded to Cloud"
        })
    }
    catch(error)
    {
        console.log(error);
        res.status(400).json({
            status : false,
            message:`"Something went wrong" ${error}`
        })
    }
}