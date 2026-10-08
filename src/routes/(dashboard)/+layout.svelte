<script lang="ts">
	import { onMount } from 'svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { getMessaging, getToken, onRegistered, register } from 'firebase/messaging';
	import { PUBLIC_FIREBASE_VAPID_KEY } from '$env/static/public';
	import { app } from '$lib/firebase';
	import { PostMethod } from '$lib/constants/methods';
	import { RegisterFCMTokenApi } from '$lib/constants/endpoints';
	import {
		type FCMTokenPayload,
		type FCMTokenResponse
	} from '$lib/services/notification/fcm_token.types.js';

	let { children, data } = $props();
	onMount(async () => {
		try {
			const device_id = data.device_id ? data.device_id : localStorage.getItem('device_id');
			const fcm_token = localStorage.getItem('fcm_token');
			const messaging = getMessaging(app);

			const permission = await Notification.requestPermission();
			if (permission !== 'granted') return;

			const token = await getToken(messaging, {
				vapidKey: PUBLIC_FIREBASE_VAPID_KEY
				// serviceWorkerRegistration: registration
			});

			if (!token) return;
			if (token === fcm_token) return;
			try {
				const res = await PostMethod<FCMTokenPayload, FCMTokenResponse>(
					RegisterFCMTokenApi,
					{
						fcm_token: token
					},
					fetch,
					'',
					{
						Authorization: `Bearer ${data.access_token}`,
						'Content-Type': 'application/json',
						...(device_id && { deviceId: device_id })
					}
				);
				if (res.status === 201) {
					localStorage.setItem('fcm_token', res.data.fcm_token);
				}
			} catch (e) {
				console.log(e);
			}
		} catch (e) {
			console.log('error', e);
		}
	});
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main>
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
