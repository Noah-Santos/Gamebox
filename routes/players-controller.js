const express = require('express');
const router = express.Router();

const{createPlayers, readPlayers, updatePlayers, deletePlayers} = require("../controllers/players");

router.get('/', readPlayers);
router.post('/', createPlayers);
router.put('/:playerID', updatePlayers);
router.delete('/:playerID', deletePlayers);

module.exports = router;