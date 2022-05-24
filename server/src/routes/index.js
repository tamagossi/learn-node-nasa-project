const express = require('express');

const launchRouter = require('./launches/launch.router');
const planetRouter = require('./planets/planet.router');

const router = express.Router();

router.use('/', planetRouter);
router.use('/', launchRouter);

module.exports = router;
