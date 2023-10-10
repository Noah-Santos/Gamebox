const express = require('express');
const router = express.Router();

// Below here is to work with the router application

let Players = require('../models/player');

router.get('/', async(req,res)=>{
    try {
        let players = await Players.find({});
        res.json(players);
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async(req,res)=>{
    try {
        let allPlayers = await Players.find({});
        const {name, age} = req.body;

        let newPerson = await Players.create({name:name, age:age, playerID:allPlayers.length+1});
        allPlayers = await Players.find({});
        res.json(allPlayers);

    } catch (error) {
        console.log(error);
    }
});

// put request
router.put('/:playerID', async(req,res)=>{
    try {
        let {playerID} = req.params;
        let {name, age, board} = req.body;
        let changePlayer = Players.findById(playerID);

        if(!name){
            name = changePlayer.name;
        }
        if(!age){
            age = changePlayer.age;
        }
        if(!board){
            board = changePlayer.board;
        }

        let players = await Players.findOneAndUpdate({playerID:playerID}, {name:name, age:age, board:board});
    } catch (error) {
        console.log(error);
    }
})

// delete request
router.delete('/:playerID', async(req, res)=>{
    try {
        const {playerID} = req.params;
        let player = await Players.findOneAndDelete({playerID:playerID});
        res.json(player);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;