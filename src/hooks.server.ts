import { LoginApi, RegisterApi } from "$lib/constants/endpoints";
import { isTokenExpired } from "$lib/helpers/checkToken";
import { redirect, type HandleFetch } from "@sveltejs/kit"

const publicRoutes = [RegisterApi];



export const handleFetch: HandleFetch = async ({ request, fetch, event }) => {
    const isPublicRoute = publicRoutes.some(route => request.url.includes(route));
    if( isPublicRoute ) {
        return await fetch(request);
    }
    const access_token = event.cookies.get('access_token');
    const refresh_token = event.cookies.get('refresh_token');
    if(!access_token) {
        const response = await fetch(request);
        return {...response, status: 401, statusText: 'Unauthorized' };
    } else if(isTokenExpired(access_token)) {
        if(!refresh_token) {
            const response = await fetch(request);
            return {...response, status: 401, statusText: 'Unauthorized' };
        } else if(isTokenExpired(refresh_token)) {
            const response = await fetch(request);
            return {...response, status: 401, statusText: 'Unauthorized' };
        } else {
            
        }
    } else {
        return await fetch(request);
        

    }
    const response = await fetch(request);
    return response;

}