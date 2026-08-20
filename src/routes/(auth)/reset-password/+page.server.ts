import { superValidate, message } from "sveltekit-superforms";
import { zod4 } from "sveltekit-superforms/adapters";
import { PostMethod } from "$lib/constants/methods";
import { fail } from "@sveltejs/kit";
import { ResetPasswordApi } from "$lib/constants/endpoints";
import type { Actions, PageServerLoad } from "./$types";
import { ResetPasswordSchema, type ResetPasswordFormData } from "$lib/services/reset-password/resetPassword.validation";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod4(ResetPasswordSchema)),
    };
};

export const actions = {
    default: async (event) => {
        const { request, fetch } = event;
        const token = event.url.searchParams.get('token') || '';
        const form = await superValidate(request, zod4(ResetPasswordSchema));
        if (!form.valid) {
            return fail(400, { form });
        }
        try {
            const res = await PostMethod<
                ResetPasswordFormData & { token: string },
                unknown
            >(ResetPasswordApi, {...form.data, token}, fetch);
            if (res.status === 200) {
                return message(form, {
                    text: res.message,
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
                    text: 'OOPS! Something went wrong!',
                    success: false
                },
                { status: 400 }
            );
        }
    }
} satisfies Actions;