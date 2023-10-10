// https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1

let Player = require('./models/player');
const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./db/connect');

async function getCards(){
    let cards = await fetch('https://www.deckofcardsapi.com/api/deck/new/')
    .then(response => {
        response.json()
        console.log(response)
    })
    console.log(cards);
    // cards.map(card=>{
    //     console.log(card);
    // })


    
}

let cards = getCards();
console.log(cards);