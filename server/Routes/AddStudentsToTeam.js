const express = require("express");
const router = express.Router();
const Student = require('../Models/StudentSchema')

router.post('/addstudents', async (req,res) => {
    try{
        const query = {email:req.body.email};
        const update = {assignedTo:req.body.assignedTo};
        await Student.findOneAndUpdate(query,update,{new:true})
        .then((updatedStudent)=>{
        //    console.log(updatedStudent);
           res.status(200).json(updatedStudent)
        });
    }
    catch(err){
        console.log("Server Error",err);
        res.send({success:false});
    }
})

module.exports = router;