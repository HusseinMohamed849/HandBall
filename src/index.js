const request = require('request');
const express = require('express');
const Player = require('./models/player');
const playerrouter = require('./routers/player')
const bodyParser = require("body-parser");
const auth = require('./middleware/auth')
const validator = require('validator')
require('./db/mongoose')
const app = require('express')();
app.listen(3000)

app.use(express.json())
app.use(playerrouter)
app.use(bodyParser.json());

console.log('🔥 Port is connected in 3000 port! 🔥🚀')
