const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Parent = require('./../modules/parents');

// POST route to create a new parent entry
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newParent = new Parent(data);
        const savedParent = await newParent.save();
        console.log("Parent Data is posted");
        res.status(200).json(savedParent);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET route to fetch all parent entries
router.get('/', async (req, res) => {
    try {
        const finddata = await Parent.find();
        console.log('Parents Data Is Fetched');
        res.status(200).json(finddata);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT route to update a parent entry by ID
router.put('/:ID', async (req, res) => {
    try {
        const parentByID = req.params.ID;
        const updatedParentData = req.body;
        const updatedParent = await Parent.findByIdAndUpdate(parentByID, updatedParentData, { new: true });

        if (!updatedParent) {
            return res.status(404).json({ error: "Parent not found" });
        }

        console.log("Parent Data is updated");
        res.status(200).json(updatedParent);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE route to delete a parent entry by ID
router.delete('/:ID', async (req, res) => {
    try {
        const parentByID = req.params.ID;
        const deletedParent = await Parent.findByIdAndDelete(parentByID);

        if (!deletedParent) {
            return res.status(404).json({ error: "Parent not found" });
        }

        console.log("Parent Data is deleted");
        res.status(200).json({ message: "Parent deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
