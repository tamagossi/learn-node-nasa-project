const express = require('express');
const planetRouter = require('./planet.router');

const router = express.Router();

router.use('/planets', planetRouter);

module.exports = router;
