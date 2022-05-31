const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;

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
