import { LoginApi, RegisterApi, TokenRefreshApi } from '$lib/constants/endpoints';
import { BASE_URL } from '$lib/constants/envVariables';
import { isTokenExpired } from '$lib/helpers/checkToken';
import { redirect, type Handle, type HandleFetch } from '@sveltejs/kit';

const publicRoutes = [RegisterApi, LoginApi, TokenRefreshApi];

export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
	const isPublicRoute = publicRoutes.some((route) => request.url.includes(route));
	if (isPublicRoute) {
        return await fetch(request);
	}
    
	const access_token = event.cookies.get('access_token');
	const refresh_token = event.cookies.get('refresh_token');
    
	request.headers.set('Authorization', `Bearer ${access_token}`);
    
	if (!access_token || isTokenExpired(access_token)) {
		if (!refresh_token || isTokenExpired(refresh_token)) {
            const response = await fetch(request);
            if (response.status === 401) {
                throw redirect(302, '/login');
			}
			return response;
		} else {
            const res = await fetch(`${BASE_URL}/${TokenRefreshApi}`, {
                method: 'POST',
                body: JSON.stringify({ refresh: refresh_token }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.status === 200) {
                const data = await res.json();
                console.log('response',data)
                const new_access_token = data.access;
                const new_refresh_token = data.refresh;
                if (new_access_token) {
                    event.cookies.set('access_token', new_access_token, {
                        path: '/',
						maxAge: 60 * 60 * 24,
						httpOnly: true
					});
                }
                if (new_refresh_token) {
                    event.cookies.set('refresh_token', new_refresh_token, {
						path: '/',
						maxAge: 60 * 60 * 24 * 7,
						httpOnly: true
					});
                }
                request.headers.set('Authorization', `Bearer ${new_access_token}`);
                const response = await fetch(request);
                return response;
            } else {
                throw redirect(302, '/login');
            }
                    
		}
	} else {
		return await fetch(request);
	}
};
