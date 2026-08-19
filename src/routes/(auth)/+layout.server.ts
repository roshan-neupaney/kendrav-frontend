import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ cookies }) => {
//  const access_token = cookies.get('access_token')
//     const refresh_token = cookies.get('refresh_token')
//     if (access_token || refresh_token) {
//         // setTimeout(() => {
//         //     console.log('hello')
//         // }, 0)
//         throw redirect(302, '/personal_12/home')
//     }
}