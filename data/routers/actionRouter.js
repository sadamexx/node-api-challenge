const express = require('express');
const actionDB = require('../helpers/actionModel');
const projectDB = require('../helpers/projectModel');
const router = express.Router();

//get action by id
router.get('/:id', (req, res) => {
    actionDB.get(req.params.id)
    .then(a => {
        if(a) {
            res.status(200).json(a);
        } else {
            res.status(404).json({ message: "Action not found"});
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Error. Action could not be retrieved"});
    });
})

//create new action
router.post("/", (req, res) => {
    const action = req.body;

 actionDB.insert(action)
 .then(action => {
     res.status(201).json(action);
 })
 .catch(error => {
     res.status(500).json({message: "Error creating new action"});
 });
});

//edit action by id
router.put("/:id", (req, res) => {
    actionID = req.params.id;
    changes = req.body;

    actionDB.update(actionID, changes)
    .then(action => {
        if(action) {
            res.status(201).json(action);
        } else {
            res.status(404).json({ message: "No action found"});
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Sorry! There was an error while editing your action"});
    }); 
});

//delete action by id
router.delete("/:id", (req, res) => {
    const actionID = req.params.id;

    actionDB.remove(actionID)
    .then(count => {
        if(count > 0){
            res.status(200).json({message: "Your action was deleted"});
        } else {
            res.status(404).json({message: "Action could not be found"});
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Sorry! There was an error while deleting your action!"});
    });
});

module.exports = router;