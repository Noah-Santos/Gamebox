const express = require('express');
const router = express.Router();

const{createPlayers, readPlayers, updatePlayers, deletePlayers} = require("../controllers/players");

router.get('/getUser', readPlayers);
router.post('/', createPlayers);
router.put('/:email', updatePlayers);
router.delete('/:playerID', deletePlayers);

module.exports = router;