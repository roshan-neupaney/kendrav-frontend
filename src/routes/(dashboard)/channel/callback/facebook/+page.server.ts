import { ConnectWorkspaceChannelApi } from '$lib/constants/endpoints';
import { PostMethod } from '$lib/constants/methods';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { UAParser } from 'ua-parser-js';

export const load: PageServerLoad = async (event) => {
	// try {
	const { url, cookies, fetch, request } = event;
	const code = url.searchParams.get('code');
	if (!code) error(400, 'Missing OAuth Parameters');
	const workspace_slug = cookies.get('workspace_slug') ?? '';
	console.log('workspace_slug', workspace_slug);
	const workspace_id = workspace_slug?.split('-').at(-1);
	console.log('workspace_id', workspace_id);
	const res = await PostMethod<unknown, unknown>(
		ConnectWorkspaceChannelApi,
		{ code, channel_id: 1 },
		fetch,
		workspace_id,
		{
			...(workspace_id && { workspaceId: workspace_id })
		}
	);
	console.log('res', res);
	return res;
	// } catch (error) {
	//     console.log(error)
	// }
};
