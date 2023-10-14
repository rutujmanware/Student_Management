const express = require("express");
const router = express.Router();
const Student = require('../Models/StudentSchema')

router.post('/addmarks',async (req,res) =>{
    try{
        const update = {marks:{Ideation:req.body.Ideation,Execution:req.body.Execution,Viva:req.body.Viva,Presentation:req.body.Presentation},marked:req.body.marked,totalMarks:req.body.totalMarks};
        const query = {email:req.body.email};
        await Student.findOneAndUpdate(query,update,{new:true})
        .then((updatedStudent) => {
            // console.log(updatedStudent);
            res.status(200).json(updatedStudent);
        })

    }catch(error){
        console.log(error);
        res.send({success:false});
    }
    
})

module.exports = router;