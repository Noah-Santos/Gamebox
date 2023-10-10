const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Must provide a name'],
        trim: true,
    },
    age:{
        type: Number,
        default: 10
    },
    playerID:{
        type: Number,
        default: 0
    },
    wins:{
        type: Number,
        default: 0
    },
    board:{
        type: String,
        default: "[['x','x','x'],['x','x','x'],['x','x','x']]"
    }
},{collection: 'Players'})

module.exports = mongoose.model('Player', PlayerSchema);