import type { UserProfile } from "$lib/services/User/user.types";

interface UserDataTypes {
    data: UserProfile;
    isLoggedIn: boolean;
}

const initialData: UserDataTypes = {
    data: {
        email: '',
        profile: {
            full_name: ''
        },
        preferences: {
            theme: '',
            timezone: '',
            time_format: '',
            start_of_week: '',
            default_posting_option: '',
            user_id: 0
        }
    },
    isLoggedIn: false,
};

export const userData: UserDataTypes = $state(initialData);

export function setUserData(newData: any) {
    Object.assign(userData, newData);
}

