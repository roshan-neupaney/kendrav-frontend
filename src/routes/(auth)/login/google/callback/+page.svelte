<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	onMount(() => {
		if (data.success) {
			const workspace_slug = data.message?.workspace_slug;
			const device_id = data.message?.device_id;

			if (workspace_slug) localStorage.setItem('workspace_slug', workspace_slug);
			if (device_id) localStorage.setItem('device_id', device_id);

			toast.success('Login Successfully');

			goto(`/${workspace_slug}/home`, {
				replaceState: true
			});
		} else {
			toast.error('Google login failed');
			goto('/login', { replaceState: true });
		}
	});
</script>
