const express = require("express");
const user = require("./models/user");
const router = express.Router();
const userService = require('./services/userService');
const workoutService = require('./services/workoutService')

// base route
router.get('/', authTest);

// user routes
router.post('/user/authenticate', authenticate);
router.post('/user/register', register);
router.get('/user/getall', getAll);
router.get('/user/current', getCurrent);
router.get('/user/get', getById);
router.put('/user/update', update);
router.delete('/user/delete', _delete);
router.post('/user/username',getByUsername)

// workout routes
router.post('/form/checkforform',checkForFormFilling)
router.post('/form/post', postForm);
router.get('/form/get', getForm);
router.get('/form/getall', getAllForms);

// base functions

function authTest(req, res){
    res.json(201, {});
}

// workout functions

async function postForm(req, res){
    res.send("ok")
    const dateToDb = req.body.details.date;
    console.log(dateToDb,'datedb');
    const theUser = await user.findOne({username:req.body.username});
    var canSave = true;
    for(value in theUser.training) {console.log(theUser.training[value].date);if(theUser.training[value].date==dateToDb) {console.log("s-a gasit");canSave=false;break;}}
    await theUser.training.push(req.body.details);
    if(canSave) theUser.save();
    
}
async function checkForFormFilling(req,res){
    var message = ""
    const theUser = await user.findOne({username:req.body.username});
    console.log(req.body)
    theUser.training.map((value)=>{
        console.log(value.date, req.body.date)
        if(value.date===req.body.date) message=`You already filled the form for ${value.date}!`;})
    res.send(message)
}

function getForm(req, res) {
    workoutService.getById(req.body.workout_id);
}
function getByUsername(req,res){
    
    userService.getByUsername(req.body.username)
    .then(response=>res.json(response))
    
}
function getAllForms(req, res) {
   workoutService.getAll(req.user.sub)
   .then(workouts => res.json(workouts))
}

// user functions

function authenticate(req, res, next) {
    
    // userService.authenticate(req.body)
    //     .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    //     .catch(err => next(err));
    userService.authenticate(req.body)
    .then(user =>{
        if(user)
        { 
            res.cookie('token', user.token, {httpOnly: true});
            res.json(user);
        }
        else
        {
            res.status(400).json({ message: 'Username or password is incorrect' })
        }
    })
    .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    const users = userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.query.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.body._id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}


module.exports = router