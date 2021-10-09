const request = require('request');
const express = require('express');
const Player = require('./models/player');
const playerrouter = require('./routers/player')
const Team = require('./models/team');
const teamrouter = require('./routers/team')
const Attend = require('./models/attend');
const attendrouter = require('./routers/attend')
const Trainer = require('./models/trainer');
const trainerrouter = require('./routers/trainer')
const Supscrip = require('./models/subscription');
const subscriprouter = require('./routers/subscription')
const bodyParser = require("body-parser");
const auth = require('./middleware/auth')
const validator = require('validator')
require('./db/mongoose')
const app = require('express')();
app.listen(3000)

app.use(express.json())
app.use(playerrouter)
app.use(teamrouter)
app.use(trainerrouter)
app.use(attendrouter)
app.use(subscriprouter)
app.use(bodyParser.json());

console.log('🔥 Port is connected in 3000 port! 🔥🚀')
