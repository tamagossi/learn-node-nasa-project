const express = require('express');
const planetRouter = require('./planets/planet.router');

const router = express.Router();

router.use('/', planetRouter);

module.exports = router;
