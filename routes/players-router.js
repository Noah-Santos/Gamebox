const express = require('express');
const router = express.Router();

// Below here is to work with the router application

let Players = require('../models/player');

router.get('/getUser', async(req,res)=>{
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
router.put('/:email', async(req,res)=>{
    try {
        let {email} = req.params;
        let {won} = req.body;
        let changePlayer = User.findOne({email:email});
        let players;

        if(won){
            players = await User.findOneAndUpdate({email:email}, {games: changePlayer.game+1, wins: changePlayer.wins+1, won:false});
        }else{
            players = await User.findOneAndUpdate({email:email}, {games: changePlayer.game+1, loses: changePlayer.loses+1});
        }
        res.json(players);
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