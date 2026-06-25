import { RegisterSchema, type RegisterFormData } from '$lib/services/register/register.validation';
import { formatErrors } from '$lib/utils/zod';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { PostMethod } from '$lib/constants/methods';
import { RegisterApi } from '$lib/constants/endpoints';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(RegisterSchema)),
  };
};


export const actions = {
	default: async ({ request, fetch }) => {
		try {
			console.log('first')
			const form = await superValidate(request, zod4(RegisterSchema));
			console.log('form', form)
			if(!form.valid){
				return fail(400, { form })
			}
			// const requestData = await request.formData();

			// const formData = {
			// 	full_name: requestData.get('full_name'),
			// 	email: requestData.get('email'),
			// 	password: requestData.get('password'),
			// 	confirm_password: requestData.get('confirm_password')
			// };

			// const validatedData = RegisterSchema.safeParse(formData);
			// if (!validatedData.success) {
			// 	return fail(400, {
			// 		errors: formatErrors(validatedData.error)
			// 	});
			// }

			// const res = await PostMethod<RegisterFormData, unknown>(
			// 	RegisterApi,
			// 	validatedData.data,
			// 	fetch
			// );
			// if (res.status === 201) {
			// 	return {
			// 		message: res.message,
			// 		success: true
			// 	};
			// } else {
			// 	return fail(400, {
			// 		message: res.message,
			// 		success: false
			// 	});
			// }
		} catch (error) {
			return fail(400, {
				message: 'Something went wrong!',
				success: false
			});
		}
	}
} satisfies Actions;
