const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
	customers: [String],
	destination: { type: String },
	flightNumber: { type: Number, required: true },
	launchDate: { type: Date, required: true },
	mission: { type: String, required: true },
	rocket: { type: String, required: true },
	upcoming: { type: Boolean, required: true },
	success: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('Launch', launchesSchema);
