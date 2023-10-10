const express = require('express');
const router = express.Router();

// Below here is to work with the router application

let People = require('../models/player');

router.get('/', async(req,res)=>{
    try {
        let players = await People.find({});
        res.json(players);
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async(req,res)=>{
    try {
        let allPeople = await People.find({});
        const {name, age} = req.body;

        let newPerson = await People.create({name:name, age:age, playerID:allPeople.length+1});
        allPeople = await People.find({});
        res.json(allPeople);

    } catch (error) {
        console.log(error);
    }
});

// put request
router.put('/:playerID', async(req,res)=>{
    try {
        let {playerID} = req.params;
        let {name, age} = req.body;
        let changePeople = People.findById(playerID)

        if(!name){
            name = changePeople.name;
        }
        if(!age){
            age = changePeople.age;
        }

        let players = await People.findOneAndUpdate({playerID:playerID}, {name:name, age:age});
        res.json(players);
    } catch (error) {
        console.log(error);
    }
})

// delete request
router.delete('/:playerID', async(req, res)=>{
    try {
        const {playerID} = req.params;
        let player = await People.findOneAndDelete({playerID:playerID});
        res.json(player);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;