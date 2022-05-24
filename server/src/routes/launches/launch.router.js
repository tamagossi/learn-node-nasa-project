const express = require('express');
const { getLaunches } = require('./launch.controller');

const launchRouter = express.Router();

launchRouter.get('/launches', getLaunches);

module.exports = launchRouter;
