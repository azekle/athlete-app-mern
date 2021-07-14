const express = require('express');
const routes = require("./routes");
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('./services/jwt');
﻿const config = require('./config.json');

const app = express()

// Connect to MongoDB
mongoose.connect(config.connectionString,{ useNewUrlParser: true, useUnifiedTopology: true }).catch(err => () =>{console.log(err)}).then(() => {
    console.log("MongoDB Connected");
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(jwt());
    app.use("/api/v1", routes);
    app.listen(config.port, () => {
        console.log('Listening on port ' + config.port);
    })
})

module.exports = mongoose;