const mongoose = require("mongoose");

const training = new mongoose.Schema({
     date: {type:String,unique:true},
     sleep:{type:String},
     fatigue:{type:String},
     session1: {type:String},
     duration1:{type:String},
     rpe1:{type:String},
     wellness1: {type:String},
     session2: {type:String},
     duration2:{type:String},
     rpe2:{type:String},
     wellness2: {type:String},
     });
const tests = new mongoose.Schema({
    date:{type:String},
    test1:{type:String},
    test2:{type:String},
    test3:{type:String},
    test4:{type:String}
})
const schema = new mongoose.Schema({
    national_id: {type: Number, unique: true, required: true},
    is_coach: {type: Boolean, required: true},
    username: {type: String, unique: true, required: true},
    hash: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    team: {type: String, required: true},
    training:[training],
    tests:tests,
    createdDate: {type: Date, default: Date.now},
})

module.exports = mongoose.model("User", schema)