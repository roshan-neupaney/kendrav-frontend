<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from 'svelte-sonner';
	import { getMessaging, register } from 'firebase/messaging';
	import {PUBLIC_FIREBASE_VAPID_KEY} from '$env/static/public'

	const temp = async () => {
		const messaging = getMessaging();

		const permission = await Notification.requestPermission();
		if (permission !== 'granted') {
			return;
		}
		console.log('Notification permission granted.');
		const token = await register(messaging, { vapidKey: PUBLIC_FIREBASE_VAPID_KEY });
		
		console.log(token)
	};

	temp()

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Toaster richColors position="top-right" />
{@render children()}
