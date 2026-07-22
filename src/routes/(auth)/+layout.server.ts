import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
    console.log('first')
//   if (!locals.user) {
//     return {
//       status: 302,
//       redirect: '/login'
//     };
//   }

//   return {
//     user: locals.user
//   };
}