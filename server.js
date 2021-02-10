const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/workout", 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

const db = require("./models");

require("./routes/api.js")(app);
require("./routes/html.js")(app);

app.listen(PORT,function(){ 
    console.log(`App listening on Port ${PORT}`);
});