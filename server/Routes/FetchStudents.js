const express = require("express");
const router = express.Router();
const Student = require('../Models/StudentSchema')

router.get('/getstudents',async (req,res) => {
    try{
        const students = await Student.find({});
        // console.log(students);
        res.send(students);
    }
    catch(err){
        console.log("Server Error",err);
        res.send({success:false});
    }
})
module.exports = router;