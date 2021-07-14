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
        res.json(201, post);
    }).catch(err => next(err));
}

async function getById(id){
    const req_form = await workout.find(id);
    res.json(201, req_form);
}

async function getAll(){
    const workoutforms = await workout.find();
	res.json(201, workoutforms);
}