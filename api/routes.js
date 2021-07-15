const express = require("express");
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

// workout routes
router.post('/form/post', postForm);
router.get('/form/:id', getForm);
router.get('/form/getall', getAllForms);

// base functions

function authTest(req, res){
    res.json(201, {});
}

// workout functions

function postForm(req, res){
    const post = workoutService.create(req.body);
}

function getForm(req, res) {
    const workout = workoutService.getById(req.body.workout_id);
}

function getAllForms(req, res) {
    const workouts = workoutService.getAll();
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
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}


module.exports = router