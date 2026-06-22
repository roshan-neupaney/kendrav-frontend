import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export const getRoutes = (
	urlList: { [key: string]: string },
	name: string,
	id?: string,
	params?: { [key: string]: string }
) => {
	if (urlList[name]) {
		let url = urlList[name];
		if (id) {
			url = url.replace(':id', id);
		}
		if(params){
			const queryParams = new URLSearchParams(params).toString();
			url +=`?${queryParams}`;
		}
		return url;
	} else {
		throw new Error(`URL with the name ${name} doesn't exists.`);
	}
};
