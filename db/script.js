const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const CRC32 = require("crc-32");

// A `main` function so that we can use async/await
async function main() {
  {
    // Seed the database with users
    const user1 = await prisma.user.create({
      data: {
        email: 'alice@notionalapi.com',
        pass_hash: '2bd806c97f0e00af1a1fc3328fa763a9269723c8db8fac4f93af71db186d6e90',
        payment_code: CRC32.bstr('alice@notionalapi.com', 0).toString(16),
      },
    })
    const user2 = await prisma.user.create({
      data: {
        email: 'bob@notionalapi.com',
        pass_hash: '81b637d8fcd2c6da6359e6963113a1170de795e4b725b84d1e0b4cfd9ec58ce9',
        payment_code: CRC32.bstr('bob@notionalapi.com', 0).toString(16),
      },
    })
    console.log(`Created users: ${user1.email} (password alice) and ${user2.email}(password bob) `);

    // Retrieve all users
    const allUsers = await prisma.user.findMany({ })
    console.log(`Retrieved all users: `, allUsers)
  }

  {
    // Seed the database with points
    const user1_point = await prisma.point.create({
      data: {
        email: 'alice@notionalapi.com',
        point: 1000000,
      },
    })
    const user2_point = await prisma.point.create({
      data: {
        email: 'bob@notionalapi.com',
        point: 2000000,
      },
    })
    console.log(`Created points for users: ${user1_point.email} (${user1_point.point}) and ${user2_point.email} (${user2_point.point}) `);

    // Retrieve all points
    const allPoints = await prisma.point.findMany({ })
    console.log(`Retrieved all points: `, allPoints)
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

  {
    // Seed the database with regitration
    // Charlie
    const charlie_reg = await prisma.registration.create({
      data: {
        email: 'charlie@notionalapi.com',
        pass_hash: 'b9dd960c1753459a78115d3cb845a57d924b6877e805b08bd01086ccdf34433c',
        activation_code: 'b9dd960c1753459a78115d3cb845a57d924b6877e805b08bd01086ccdf34433c',
        submitted_at: new Date(),
      },
    });
    console.log(`Created 1 registration: ${charlie_reg.email}`);

    // findUnique
    const db_reg_charlie = await prisma.registration.findUnique({where: {email: charlie_reg.email}});
    console.log(`findUnique: `, db_reg_charlie);

    // Retrieve all registration
    const allRegs = await prisma.registration.findMany({ })
    console.log(`Retrieved all registrations: `, allRegs);
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
