import type { Google } from 'arctic';

export const availableProviders = (providers: { google: Google | null }) => {
	const list = [];
	if (providers?.google) list.push('google');
	return list;
};
