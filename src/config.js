import axios from 'axios';



const apiRootUrl = "https://media-matrix-backend.herokuapp.com/auth/";


const getUserToken = async () => {
	try {
		const token = await localStorage.getItem("token");

		return token;
	} catch (error) {
		return error;
	}
};

const setTokenIfExists = async options => {
	const token = await getUserToken();

	if (token === null) {
		return;
	}

	if (!options.headers) {
		options.headers = {};
	}

	options.headers.Authorization = `Bearer ${token}`;
};

const http = {
	async request(url, method, data, options = {}) {
		return new Promise(async (resolve, reject) => {
			await setTokenIfExists(options);
			try {
				const response = await axios({
					method,
					url,
					baseURL: apiRootUrl,
					data,
					...options
				});

				resolve(response);
			} catch (error) {
				let message;
				let errors = [];
				console.log({error});
				if (!error.response) {
					message =
						"An unexpected error occured. Please, check your internet and try again.";
				} else if (error.response.data) {
					// console.log(error.response)
					message = error.response.data.message;
					errors = error.response.data.errors;
				} else {
					switch (error.response.status) {
						case 401:
							message = "You are not authorized to access this resource.";
							break;
						case 404:
							message =
								"This resource could not be found. Please check the request and try again.";
							break;
						case 500:
							message = `An error occured on the server. Please try again later or contact support if error persists`;
							break;
						default:
							message = "An unexpected error has occurred. Please, try again.";
							break;
					}
				}
				const arr = [message, errors];
				reject(arr);
			}
		});
	},
	get(url, params = {}) {
		const options = { params };
		return this.request(url, "GET", null, options);
	},
	post(url, data, isJson = true) {
		const options = {};
		if (!isJson) {
			options.headers = { "Content-Type": "multipart/form-data" };
			const formData = new FormData();
			Object.entries(data).forEach(([key, value]) =>
				formData.append(key, value)
			);
			data = formData;
		}

		return this.request(url, "POST", data, options);
	},
	put(url, data, isJson = true) {
		const options = {};

		if (!isJson) {
			options.headers = { "Content-Type": "multipart/form-data" };
			const formData = new FormData();
			Object.entries(data).forEach(([key, value]) =>
				formData.append(key, value)
			);
			data = formData;
		}
		return this.request(url, "PUT", data, options);
	},
	delete(url) {
		return this.request(url, "DELETE");
	}
};

export default http;
