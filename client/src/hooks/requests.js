const API_URL = 'http://localhost:8000';

async function httpGetPlanets() {
	try {
		const response = await fetch(`${API_URL}/planets`);
		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
}

async function httpGetLaunches() {
	try {
		const response = await fetch(`${API_URL}/launches`);
		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
}

async function httpSubmitLaunch(launch) {
	try {
		const response = await fetch(`${API_URL}/launches`);
		return await response.json();
	} catch (error) {
		throw new Error(error);
	}
}

async function httpAbortLaunch(id) {
	// TODO: Once API is ready.
	// Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
