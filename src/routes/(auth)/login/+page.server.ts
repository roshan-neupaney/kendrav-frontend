import { loginSchema, type LoginFormData } from '$lib/services/login/login.validation';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { LoginApi } from '$lib/constants/endpoints';
import { PostMethod } from '$lib/constants/methods';
import type { LoginResponse } from '$lib/services/login/login.types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { availableProviders } from '$lib/config/oauth';
import { providers } from '$lib/services/oauth';
import { getLocation } from '$lib/utils';
import { UAParser } from 'ua-parser-js';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(loginSchema)),
		availableProviders: availableProviders(providers)
	};
};

export const actions = {
	default: async (event) => {
		const { request, fetch, cookies } = event;

		const userAgent = request.headers.get('user-agent') || '';
		const parser = new UAParser(userAgent);
		const device_name = `${parser.getBrowser().name} on ${parser.getOS().name}`;

		const ip = event.getClientAddress();
		const location = await getLocation(ip);

		const device_id = cookies.get('device_id') || crypto.randomUUID();

		const form = await superValidate(request, zod4(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const res = await PostMethod<
				LoginFormData & { device_id: string; device_name: string; location: string },
				LoginResponse
			>(LoginApi, { ...form.data, device_id, device_name, location }, fetch);
			if (res.status === 200) {
				const access_token = res.data.access_token;
				const refresh_token = res.data.refresh_token;
				if (access_token) {
					cookies.set('access_token', access_token, {
						path: '/',
						maxAge: 60 * 15,
						httpOnly: true
					});
				}
				if (refresh_token) {
					cookies.set('refresh_token', refresh_token, {
						path: '/',
						maxAge: 60 * 60 * 24 * 7,
						httpOnly: true
					});
				}
				cookies.set('device_id', device_id, {
					path: '/',
					maxAge: 60 * 60 * 24 * 365,
					httpOnly: false
				});
				return message(form, {
					text: res.message,
					data: {
						...res.data, device_id
					},
					success: true
				});
			} else {
				return message(
					form,
					{
						text: res.message,
						success: false
					},
					{ status: 400 }
				);
			}
		} catch (error) {
			return message(
				form,
				{
					text: 'Something went wrong!',
					success: false
				},
				{ status: 400 }
			);
		}
	}
} satisfies Actions;
