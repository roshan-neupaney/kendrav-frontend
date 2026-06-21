import type { Handle, HandleFetch } from "@sveltejs/kit";

const privateApiRoutes = [];
const publicApiRoutes = ['login']

export const handle: Handle = async({event, resolve}) => {
    const response = await resolve(event);
    console.log('url', event)
    
    response.headers.set('authorization', '')
    return response;
}

// export const handleFetch: HandleFetch = async({request, event, fetch}) => {
//     const url = new URL(request.url);
//     console.log('request', request);
//     return fetch(request);

// }