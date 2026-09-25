<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_TIKTOK_CLIENT_KEY } from '$env/static/public';
    

	// 1. Generate a random code verifier
	const SCOPES = 'user.info.basic,user.info.profile';

	const { userData } = page.data;

	console.log('userData', userData);
	const callbackUrl = 'http://localhost:5173/channel/callback/facebook';
	const titokCallbackUrl = 'http://localhost:5173/channel/callback/tiktok';

	async function generateCodeVerifier(length = 64): Promise<string> {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (x) => charset[x % charset.length]).join('');
  }

  async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    // TikTok wants hex-encoded SHA-256, not base64url
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  async function startTikTokAuth() {
    const codeVerifier = await generateCodeVerifier(64); // 43–128 chars
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = crypto.randomUUID(); // or any random string

    // Store these so you can use them on the callback
    // Prefer httpOnly cookie via server action if possible
    sessionStorage.setItem('tiktok_code_verifier', codeVerifier);
    sessionStorage.setItem('tiktok_state', state);

    const params = new URLSearchParams({
      client_key: PUBLIC_TIKTOK_CLIENT_KEY,
      response_type: 'code',
      scope: SCOPES,
      redirect_uri: 'https://retorted-groggily-launder.ngrok-free.dev/channel/callback/tiktok',
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    });

    window.location.href = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
  }
</script>

<div>home</div>
<a href="/pasdf/create">Create</a>

<br />
<br />
<button
	onclick={() => {
		window.location.href = `https://www.facebook.com/v26.0/dialog/oauth?client_id=957260226693711&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=pages_read_engagement&pages_messaging&response_type=code`;
	}}
>
	Connect Facebook
</button>
<br />
<br />
<button onclick={startTikTokAuth}>
  Continue with TikTok
</button>