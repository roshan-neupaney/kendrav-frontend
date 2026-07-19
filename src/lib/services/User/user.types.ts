interface Preferences {
    theme: string;
    timezone: string;
    time_format: string;
    start_of_week: string;
    default_posting_option: string;
    user_id: number;
}

interface Profile {
    full_name: string;
}

interface UserProfile {
    email: string;
    profile: Profile;
    preferences: Preferences;
}

export type {
    UserProfile
}