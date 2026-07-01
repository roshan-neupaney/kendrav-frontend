// src/lib/config/oauth.ts  ← client-safe, no secrets
export const availableProviders = (providers: { google: boolean }) => {
    const list = [];
    if (providers.google) list.push('google');
    return list;
};