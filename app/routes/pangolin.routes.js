module.exports = app => {
    const pangolins = require("../controllers/pangolin.controller.js")

    var router = require("express").Router();

    //Create a new Pangolin 
    router.post("/", pangolins.create);

    //Retrieve all Pangolin
    router.get("/", pangolins.findAll);


    //Retrieve a single Pangolin with id
    router.get("/:id", pangolins.findOne);

    //Update Pangolin with id
    router.put("/:id", pangolins.update);

    //Delete a single Pangolin with id
    router.delete("/:id", pangolins.delete);

    //Delete all Pangolins
    router.delete("/", pangolins.deleteAll);

    app.use("/api/pangolins", router)



}  