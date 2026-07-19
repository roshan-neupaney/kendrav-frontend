import { UserProfileApi } from "$lib/constants/endpoints"
import { GetMethod } from "$lib/constants/methods"
import type { UserProfile } from "$lib/services/User/user.types"

export const load = async ({ fetch }) => {
    const res = await GetMethod<UserProfile>(UserProfileApi, fetch)
    // console.log('res', res);
}