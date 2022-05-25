const express = require('express');
const { getPlanets } = require('./planets.controller');

const planetRouter = express.Router();

planetRouter.get('/', getPlanets);

module.exports = planetRouter;
