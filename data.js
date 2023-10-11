// https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// import axios from "axios";

let Player = require('./models/player');
const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./db/connect');

async function getDeck(){
    // let {deck_id} = await fetch('https://www.deckofcardsapi.com/api/deck/new/');
    let deck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response =>{return response.json()});
    console.log(deck);
}
getDeck();
// console.log(cards);