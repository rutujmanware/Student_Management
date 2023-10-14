const express = require("express");
const router = express.Router();
const Student = require('../Models/StudentSchema')
// Name:{
//     type:String,
//     required:true,
// },
// email:{
//     type:string,
//     required:true,
//     unique:true
// },
// marks:{
//     Ideation:Number,
//     Execution:Number,
//     Viva:Number,
//     Presentation:Number
// },
// totalMarks:Number,
// assignedTo:{
//     type:String,
//     default:"No"
// },
// marked:String,

router.post('/createstudent', async (req,res) => {
    try {
       const student ={
        name:req.body.name,
        email:req.body.email,
        marks:{
            Ideation:req.body?.marks?.Ideation,
            Execution:req.body?.marks?.Execution,
            Viva:req.body?.marks?.Viva,
            Presentation:req.body?.marks?.Presentation,

        },
        totalMarks:req.body.totalMarks,
        assignedTo:req.body?.assignedTo,
        marked:req.body.marked,
       }
       await Student.create(student);
       res.send({success:true});
       


    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
})
module.exports = router;