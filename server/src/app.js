const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./routes');

const app = express();

app.use(morgan('combined'));
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use(router);
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/', 'index.html'));
});

module.exports = app;
