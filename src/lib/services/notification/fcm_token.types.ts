interface FCMTokenResponse {
	id: number;
	fcm_token: string;
}

interface FCMTokenPayload {
    fcm_token: string;
}

export type { FCMTokenResponse, FCMTokenPayload };