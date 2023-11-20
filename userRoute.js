const express=require("express");

var router=express.Router();

var userModel=require("../models/userModel");

router.get('/getdata',async(req,res)=>{
    try{
        var k="Hai";
        console.log(k);
        res.send(k);
    }
    catch(e){
        console.log(e); 
    }
});

router.get('/reg', async(req,res)=>{
    try{
        var { name,rollNo,email,password,address}=req.query;

        if(!password){
            res.status(200).json({
                msg: "Password not found"
            });
            return;
        }
        if(!email){
            res.status(200).json({
                msg: "mail Id not found"
            });
            return;
        }

        var user = new userModel();
        user.name=name;
        user.rollNo=rollNo;
        user.email=email;
        user.password=password;
        user.address=address;
        await user.save();
        res.status(200).json({
            msg:"Sucess",
            data:user

        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            msg : "Internal server Error"
        })
    }
})

router.get('/user', async(req,res)=>{

    try{

        var data = await userModel.find({
            status: "Active"
        });
        res.status(200).json({
            data:data,
            msg:"User List"
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            msg : "Internal server Error"
        })
    }
});


router.get('/edit' ,async(req,res)=>{
    try{

        var  {email, newEmail } = req.query;
        var data= await userModel.findOne({
            status: "Active",
            email:email
        })
        if(data){
            data.email=newEmail
            await data.save()
            res.status(200).json({
                status: true,
                msg: "Edited"
            });
            return
        }else{
            res.status(200).json({
                msg: "Invalid Email id"
            })
        }
        
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
})


router.get('/delete',async(req,res)=>{
    try{

        var  {email}=req.query;
        var data=await userModel.findOne({email:email})
        if(data){
                await userModel.deleteOne({email:email})
                res.status(200).json({
                    status: true,
                    msg:"Deleted"
                })
                return;
                
        }
        else{
            res.status(200).json({
                msg: "Invalid email Id"
            })
        }

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
})





module.exports=router;

