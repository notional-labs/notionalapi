const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  // Seed the database with users and posts
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@notionalapi.com',
      pass_hash: '2bd806c97f0e00af1a1fc3328fa763a9269723c8db8fac4f93af71db186d6e90',
    },
  })
  const user2 = await prisma.user.create({
    data: {
      email: 'bob@notionalapi.com',
      pass_hash: '81b637d8fcd2c6da6359e6963113a1170de795e4b725b84d1e0b4cfd9ec58ce9',
    },
  })
  console.log(`Created users: ${user1.email} (password alice) and ${user2.email}(password bob) `)

  // Retrieve all users
  const allUsers = await prisma.user.findMany({ })
  console.log(`Retrieved all users: `, allUsers)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
