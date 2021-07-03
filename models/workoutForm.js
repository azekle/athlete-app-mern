const mongoose = require("mongoose");

const workoutForm = new mongoose.Schema({
    id: Number,
    season: String,
    week: Number,
    date: Date,
    trainer_name: String,
    team: String,
    session_type: Number,
    duration: Number,
    rpe: Number,
    mental_alert: Number,
    muscle_soreness: Number,
    sleeping_hours: Number,
    motivation: Number,
    pain_level: Number,
    pain_location: Array,
    pain_side: Number
})

module.exports = mongoose.model("workoutForm", workoutForm)