const express = require('express');
const { httpGetLaunches, httpAddLaunch } = require('./launch.controller');

const launchRouter = express.Router();

launchRouter.get('/', httpGetLaunches);
launchRouter.post('/', httpAddLaunch);

module.exports = launchRouter;
