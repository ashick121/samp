const mongoose=require("mongoose");

var userSchema =mongoose.Schema({

    name: {type:String},
    rollNo: {type:Number},
    email:{type:String,required:true},
    password:{type:String,required:true},
    status:{type: String,default:"Active"},
    address:{type:String}
});

module.exports=mongoose.model("userModel",userSchema);
