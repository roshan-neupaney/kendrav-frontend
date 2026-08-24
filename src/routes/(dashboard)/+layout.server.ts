import { UserProfileApi } from '$lib/constants/endpoints';
import { GetMethod } from '$lib/constants/methods';

export const load = async ({ fetch }) => {
	const res = await GetMethod(UserProfileApi, fetch);

	return {
		userData: res.data
	};
};
