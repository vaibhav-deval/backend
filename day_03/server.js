require('dotenv').config()
const app = require("./src/app.js");
const mongoose=require('mongoose')

//access env var
const PORT =process.env.PORT||3000;
const DB_URL=process.env.DB_URL;

function connectToDB(){
    mongoose.connect(DB_URL)
    .then(()=>{
        console.log('CONNECTED TO DATABASE');
       
    })
}

connectToDB();

app.listen(PORT, () => {
  console.log("server is running at port 3000");
});
