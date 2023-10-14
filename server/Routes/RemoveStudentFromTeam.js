const express = require("express");
const router = express.Router();
const Student = require('../Models/StudentSchema')

router.post('/removestudent', async(req,res) => {
    try{
        const query = {email:req.body.email};
        const update = {assignedTo:"No",marks:{Ideation:req.body.Ideation,Execution:req.body.Execution,Viva:req.body.Viva,Presentation:req.body.Presentation},marked:req.body.marked,totalMarks:req.body.totalMarks};
        await Student.findOneAndUpdate(query,update,{new:true})
        .then((updatedStudent) => {
            // console.log(updatedStudent);
            res.send({success:true});
        })

    }catch(err){
        console.log(err);
        res.send({success:false});
    }
})

module.exports = router;