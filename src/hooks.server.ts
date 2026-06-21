// hooks.server.ts
import { env } from '$env/dynamic/private';
import { apiRoutes } from '$lib/constants/endpoints';
import { getRoutes } from '$lib/utils';
import type { Handle, HandleFetch } from '@sveltejs/kit';

const privateApiRoutes = [];
const publicApiRoutes = ['login'];

const baseUrl = env.BASE_URL;

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
    if(!request.url.startsWith('http')){
        const endpointUrl = getRoutes(apiRoutes, request.url)
        request.url.replace(request.url, `${baseUrl}/${endpointUrl}`);
    }
    const modifiedRequest = new Request(request);
    console.log(modifiedRequest)
	return fetch(modifiedRequest);
};