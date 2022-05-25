const express = require('express');
const { httpGetLaunches, httpAddLaunch, httpAbortLaunch } = require('./launch.controller');

const launchRouter = express.Router();

launchRouter.delete('/:id', httpAbortLaunch);
launchRouter.get('/', httpGetLaunches);
launchRouter.post('/', httpAddLaunch);

module.exports = launchRouter;
