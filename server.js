const express = require ("express");
const bodyParser = require("body-parser")
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of conent-type - application/x-www-form-urlencodd
app.use(bodyParser.urlencoded({ extended: true}));

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {
        console.log("connected to the database");
    })
    .catch(err => {
        console.log("cannot connect to the database", err);
        process.exit();
    });

//simple route
app.get("/", (req, res) => {
    res.json({message: "welcome to Panglin application."})
});

require("./app/routes/pangolin.routes")(app);

//set port, listen for requests

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});