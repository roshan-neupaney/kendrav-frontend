import { UserProfileApi } from '$lib/constants/endpoints';
import { GetMethod } from '$lib/constants/methods';
import type { LayoutServerLoad } from '../(auth)/$types';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
	const res = await GetMethod(UserProfileApi, fetch);
	const access_token = cookies.get('access_token')
	const device_id = cookies.get('device_id')

	return {
		userData: res.data,
		access_token,
		device_id
	};
};
