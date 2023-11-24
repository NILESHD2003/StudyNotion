const mon = require("mongoose");
require("dotenv").config();

exports.connect() = () =>{
    mon.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("Database Connection Successful")).catch((e)=>{
        console.error("Database Connection Failed")
        process.exit(1);
    })
}