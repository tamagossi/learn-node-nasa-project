const cors = require('cors');
const express = require('express');
const router = require('./routes');

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);
app.use(express.json());
app.use(router);

module.exports = app;
