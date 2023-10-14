const mongoose = require("mongoose");
const { Schema } = mongoose;
const StudentSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    marks:{
        Ideation:Number,
        Execution:Number,
        Viva:Number,
        Presentation:Number
    },
    totalMarks:Number,
    assignedTo:{
        type:String,
        default:"No"
    },
    marked:String,
})

module.exports = mongoose.model("Students",StudentSchema);