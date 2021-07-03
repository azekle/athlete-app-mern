const express = require("express");
const db = require("mongoose").connection;
const workoutForm = require("./models/workoutForm");
const router = express.Router();

// post new workout
router.post('/form', (req, res) => {
    var form = new workoutForm(req.query);
    form.save((err, post) => {
        if (err) { return next(err) }
        res.json(201, post);
    });
})

// get all workouts for specific fields
router.get('/form', async (req, res) => {
    const req_form = await workoutForm.find(req.query);
    res.json(201, req_form);
})

// Get all workouts
router.get("/forms", async (req, res) => {
	const workoutforms = await workoutForm.find();
	res.json(201, workoutforms);
})

module.exports = router