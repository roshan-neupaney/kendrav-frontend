import { PostMethod } from '$lib/helpers/auth';
import type { LoginResponse } from './login.types';
import type { LoginFormData } from './login.validation';

export const LoginPost = async (
	url: string,
	payload: LoginFormData,
	fetchFn: typeof fetch = fetch
) => {
	
	const res = await PostMethod<LoginFormData, LoginResponse>(url, payload, fetchFn);
	console.log('res', res)
	return res;
};
