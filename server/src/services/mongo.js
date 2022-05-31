const mongoose = require('mongoose');

const MONGO_URL =
	'mongodb+srv://tamagossi:secretmate@cluster0.gqkkj.mongodb.net/?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
	console.log('------- ✅  MongoDB connection is ready ✅ -------');
});
mongoose.connection.on('error', (error) => {
	console.log('------- ❌  MongoDB connection error ❌ -------');
	console.error(error);
});

async function connectMongo() {
	await mongoose.connect(MONGO_URL);
}

async function disconnectMongo() {
	await mongoose.disconnect();
}

module.exports = { connectMongo, disconnectMongo };
