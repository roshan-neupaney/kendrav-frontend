import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async({event, resolve}) => {
    console.log('handlerEvent', event)
    const response = await resolve(event);
    return response;
}