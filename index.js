
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const useragent=require("express-useragent");

let app=express();

var user = require("./routes/userRoute");

mongoose.connect(process.env.MONGOOSE || 'mongodb+srv://sebinthomas202:sebinsebin@cluster0.anpme5i.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>{
    console.log('connected to database');
}).catch((er)=>{
    console.log(er);
});


var port =process.env.PORT || 4000;

app.use(cors());

app.use(useragent.express());

const server=app.listen(port, function(){
    console.log(`Server is running on ${port}`);
});


app.use(user);
