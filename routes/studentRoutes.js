const express = require('express');
const { default: mongoose } = require('mongoose');
const Student=require('./../modules/student');
const router= express.Router();

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newStudent= new Student(data);
        const savedStudent=await newStudent.save();
        console.log("Student Data is posted");
        res.status(200).json(newStudent);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Enternal Sever Error"});
    }
})
 
router.get('/',async(req,res)=>{
    try{
    
        const data=await Student.find();
        console.log('Student Data Is Fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Enternal Sever Error"});
    }
});
//update student data 
router.put('/:id', async (req, res) => {
    try {
        const studentById = req.params.id;
        const updatedStudentData = req.body;
        const response = await Student.findByIdAndUpdate(studentById, updatedStudentData, { new: true });

        if (!response) {
            return res.status(404).json({ error: "Student not found" });
        }

        console.log("Student Data Is Updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//delete student data

router.delete('/:id', async (req, res) => {
    try {
        const studentById = req.params.id;
        const deletedStudent = await Student.findByIdAndDelete(studentById);

        if (!deletedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        console.log("Student Data Is Deleted");
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports=router;