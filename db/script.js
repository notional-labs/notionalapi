const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  {
    // Seed the database with users
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
    console.log(`Created users: ${user1.email} (password alice) and ${user2.email}(password bob) `);

    // Retrieve all users
    const allUsers = await prisma.user.findMany({ })
    console.log(`Retrieved all users: `, allUsers)
  }

  {
    // Seed the database with apikeys
    const alice_key1 = await prisma.apikey.create({
      data: {
        apikey: 'd4f79b313f8106f5af108ad96ff516222dbfd5a0ab52f4308e4b1ad1d740de60',
        email: 'alice@notionalapi.com',
        name: 'alice-dev-key',
        note: 'for alice deving',
        created_at: new Date(),
      },
    });
    const bob_key1 = await prisma.apikey.create({
      data: {
        apikey: '038b23c7c890ac820eb5aec56e3635d076b201c82a8f91fdd16305e5d989cc38',
        email: 'bob@notionalapi.com',
        name: 'bob-dev-key',
        note: 'for bob deving',
        created_at: new Date(),
      },
    });
    console.log(`Created 2 api-keys: ${alice_key1.name} (${alice_key1.apikey}) and  ${bob_key1.name} (${bob_key1.apikey}) `);

    // Retrieve all apikeys
    const allApikeys = await prisma.apikey.findMany({ })
    console.log(`Retrieved all apikeys: `, allApikeys);
  }

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
