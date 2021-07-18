const workout = require("../models/workout");

module.exports = {
    create,
    getById,
    getAll,
};

async function create(body){
    var form = new workout(body);
    return await form.save();
}

async function getById(workout_id){6
    return await workout.find(workout_id);
}

async function getAll(user_sub){
    return await workout.find({user_reference: user_sub});
}