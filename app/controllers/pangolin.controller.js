const db = require ("../models")
const Pangolin = db.pangolins;

//create and Save a new Pangolin

exports.create = (req, res) => {
    //validate request
    if(!req.body.name) {
        res.status(400).send({ message: "content can not be empty !"});
        return;
    }


//create pangolin profil in the database
const pangolin = new Pangolin({
    name: req.body.name,
    age: req.body.age,
    family: req.body.family,
    breed: req.body.breed,
    food: req.body.food
});

//save Pangolin in the database

pangolin
    .save(pangolin)
    .then(data=>{
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while creating Pangolin."
        });
    });
};

//Retrieve all Pangolin from the database
exports.findAll = (req, res) =>{
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i"} } : {};

    Pangolin.find(condition)
        .then(data=>{
            res.send(data)
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occured while Retrieveing Pangolin."
        });
    });
};

//Find a single Pangolin with  an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pangolin.findById(id)
        .then(data => {
            if(!data)
            res.status(404).send({ message: "Not found Pangolin with the id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Pangolin with id=" + id})
        })
}

// Update a Pangolin by the id in the request 
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message:"Data to update cannot be empty!"
        });
    }
    const id = req.params.id;

    Pangolin.findByIdAndUpdate(id, req.body, {useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(404).send({
                    message: `cannot update Pangolin with id = ${id}. Maybe pangolin not found!`
                });
            } else res.send({ message: "Pangolin was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating Pangolin with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Pangolin.findByIdAndRemove(id, req.body, {useFindAndModify: false })
        .then(data => {
        if(!data) {
            res.status(404).send({
                message: `cannot delete Pangolin with id = ${id}. Maybe pangolin not found!`
            });
        } else res.send({ message: "Pangolin was deleted successfully." });
    })
        .catch(err => {
            res.status(500).send({ message: "could not delete Pangolin with id=" + id
        });
    });
};


exports.deleteAll = (req, res) => {
    

    Pangolin.deleteMany({})
        .then(data => {
        res.send({
            message: `${data.deletedCount} Pangolin was deleted successfully`
        });
    })
    .catch(err => {
        res.status(500).send({ 
            message:
                err.message || "some error occurred while removing all Pangolins."
        });
    });
};



