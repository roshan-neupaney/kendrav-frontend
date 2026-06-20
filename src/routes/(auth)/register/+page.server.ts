import type { Actions } from "./$types";

export const actions = {
    default: async({request}) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password')
        const full_name = formData.get('full_name');

        const res = await fetch('http://localhost:8000/api/auth/register/', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email, password, full_name
            })
        })
        console.log('res', res)
        return res.json();
    }
} satisfies Actions