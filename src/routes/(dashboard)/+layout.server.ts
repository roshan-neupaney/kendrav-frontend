import { UserProfileApi } from '$lib/constants/endpoints';
import { GetMethod } from '$lib/constants/methods';
import type { LayoutServerLoad } from '../(auth)/$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const res = await GetMethod(UserProfileApi, fetch);

	return {
		userData: res.data
	};
};
