const workout = require("../models/workout");

module.exports = {
    create,
    getById,
    getAll,
};

async function create(body){
    var form = new workout(body);
    form.save((err, post) => {
        if (err) {console.log(err)}
        return post;
    }).catch(err => next(err));
}

async function getById(workout_id){
    return req_form = await workout.find(workout_id);

}

async function getAll(){
    return workoutforms = await workout.find();
	res.json(201, workoutforms);
}