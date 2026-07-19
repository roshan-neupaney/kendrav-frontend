import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
	if (!token) {
		return true;
	}

	try {
		const decodedPayload = jwtDecode(token);
		const currentTime = Date.now() / 1000;
		if (decodedPayload.exp) {
			return decodedPayload.exp < currentTime;
		} else {
			return false;
		}
	} catch (error) {
		console.error('Error decoding token:', error);
		return true;
	}
};
