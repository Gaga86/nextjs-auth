import 'server-only'

// export const getUser = cache(async () => {
//   const session = await verifySession()
//   if (!session) return null
 
//   try {
//     // Explicitly return just the columns client needs rather than the whole user object
//     const user = await prisma.User.findUnique({
//       where: {
//         id: session.userId,
//       },
//       select: {
//         name: true,
//         email: true,
//         image: true,
//       },
//     })
 
//     return user
//   } catch (error) {
//     console.error('Failed to fetch user', error)
//     return null
//   }
// })