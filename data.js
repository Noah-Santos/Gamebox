// https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
// import axios from "axios";

let Player = require('./models/player');
const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./db/connect');

async function getDeck(){
    // get new shuffled deck
    let deck = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response =>{return response.json()});
    // console.log(deck);

    // get deck id
    let deck_id = deck.deck_id;
    // console.log(deck_id);

    // draw a card
    let draw = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`).then(response =>{return response.json()});
    console.log(draw);

    // print value and suit of chosen card
    let value = draw.cards[0].value;
    let suit = draw.cards[0].suit;
    console.log(`${value} of ${suit}`);
}
getDeck();
// console.log(cards);