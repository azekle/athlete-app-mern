const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    national_id: {type: Number, unique: true, required: true},
    is_coach: {type: Boolean, required: true},
    username: {type: String, unique: true, required: true},
    hash: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    team: {type: String, required: true},
    createdDate: {type: Date, default: Date.now},
})

module.exports = mongoose.model("User", schema)