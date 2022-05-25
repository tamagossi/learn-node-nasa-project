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
		return await fetch(`${API_URL}/launches`, {
			body: JSON.stringify(launch),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		return {
			ok: false,
		};
	}
}

async function httpAbortLaunch(id) {
	try {
		return await fetch(`${API_URL}/launches/${id}`, {
			method: 'DELETE',
		});
	} catch (error) {
		return {
			ok: false,
		};
	}
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
