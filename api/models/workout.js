const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user_reference: {type: String, required: true},
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

module.exports = mongoose.model("workout", schema)