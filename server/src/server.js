const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const { loadPlanetsData } = require('./models/planet.model');

const PORT = process.env.PORT || 8000;
const MONGO_URL =
	'mongodb+srv://tamagossi:secretmate@cluster0.gqkkj.mongodb.net/?retryWrites=true&w=majority';

const server = http.createServer(app);
mongoose.connection.once('open', () => {
	console.log('------- ✅  MongoDB connection is ready ✅ -------');
});
mongoose.connection.on('error', (error) => {
	console.log('------- ❌  MongoDB connection error ❌ -------');
	console.error(error);
});

const startServer = async () => {
	await mongoose.connect(MONGO_URL);
	await loadPlanetsData();

	server.listen(PORT, () => {
		console.log(`------- ℹ️  App running and listening to port ${PORT} ℹ️  -------`);
	});
};

startServer();
