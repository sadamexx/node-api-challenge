const express = require('express');
const projectDB = require("../helpers/projectModel.js");
const router = express.Router();


//get all projects
router.get("/", (req, res) => {
    projectDB.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(error => {
        res.status(500).json({ message: "The projects could not be retrieved"});
    });
});

//get project by id
router.get("/:id", (req, res) => {
    const id = req.params.id;

    if(id){
        projectDB.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({ message: "An error occured while retrieving your project"});
        })
    } else {
        res.send(404).json({ message: "There is no project with existing id"});
    }
});

//add a new project
router.post("/", (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    if( name && description){
        projectDB.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error while adding your project"});
        });
    } else {
        res.status(400).json({ message: "You must provide a name and description"});
    } 
});

//edit a project by id
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    projectDB.update(id, changes)
    .then(project => {
        if(project) {
            res.status(201).json(project);
        } else {
            res.status(404).json({ message: "Project was not found"});
        }            
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error while updating"});
        });
});

//delete a project by id
router.delete("/:id", (req, res) => {
    const id= req.params.id;
        projectDB.remove(id)
        .then(count => {
            if(count > 0){
                res.status(200).json({message: "Project successfully deleted"})
            } else {
                res.status(404).json({ message: "No project could be found with specified ID"});
            }            
        })
        .catch(error => {
            res.status(500).json({ message: "An error occurred and your project was not removed"})
        });
});

module.exports = router;