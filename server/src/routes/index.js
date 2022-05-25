const express = require('express');

const launchRouter = require('./launches/launch.router');
const planetRouter = require('./planets/planet.router');

const router = express.Router();

router.use('/planets', planetRouter);
router.use('/launches', launchRouter);

module.exports = router;
