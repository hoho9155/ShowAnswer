import axios from 'axios';

export default axios.create({
	baseURL: import.meta.env.VITE_API_SERVER_URL,
	headers: {
			[import.meta.env.VITE_API_HEADER_KEY]: import.meta.env.VITE_API_HEADER_VALUE
	}
});