const express = require('express');
const routes = require("./routes");
const mongoose = require('mongoose');

const app = express()
PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dashboarddb',{ useNewUrlParser: true, useUnifiedTopology: true }).catch(err => () =>{console.log(err)}).then(() => {
    console.log("MongoDB Connected");
    app.use("/api/v1", routes);
    app.listen(PORT, () => {
        console.log('Listening on port 3000');
    })
})

module.exports = mongoose;