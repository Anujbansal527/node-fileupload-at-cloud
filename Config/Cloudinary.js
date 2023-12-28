const cloudinary = require("cloudinary").v2;

require("dotenv").config();

exports.CloudinaryConeect = () =>
{
    try
    {
        cloudinary.config = ({
            cloud_name:"dbhfhpk3w",
            api_key:"137535828337985",
            api_secret:"ZalQ_37roAYlfyF4KzOjf39tep8",
            secure:true
    })
    }
    catch(error)
    {
        console.log(`cloudinary ${error}`);
    }
}
