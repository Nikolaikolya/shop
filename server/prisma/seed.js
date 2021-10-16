const {
  PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient();

const regions = require('../_data/regions.json');
const cities = require('../_data/cities.json');

const main = async () => {
  await regions.forEach(async item => {
    console.log(item);
    await prisma.regions.create({
      data: item
    })
  })

  await cities.forEach(async item => {
    console.log(item);
    await prisma.cities.create({
      data: item
    })
  })
}

main()
.catch(err => console.log(err))
.finally(() => console.log('Seeding'))