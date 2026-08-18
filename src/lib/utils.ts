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

// server side — parse timezone to location
function getLocationFromTimezone() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!timezone) return 'Unknown'
    const parts = timezone.split('/')
    if (parts.length >= 2) {
        return parts[1].replace('_', ' ')  // "Kathmandu"
    }
    return timezone
}

export const getLocation = async(ip: string): Promise<string> => {
    const isLocal = ip === '127.0.0.1' || 
                    ip === '::1' ||
                    ip.startsWith('192.168') || 
                    ip.startsWith('10.')
    
    if (isLocal) return getLocationFromTimezone()
    
    try {
        const res = await fetch(`https://ipapi.co/${ip}/json/`)
        const geo = await res.json()
        return `${geo.city}, ${geo.country_name}`
    } catch {
        return 'Unknown'
    }
}
