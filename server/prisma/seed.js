const {
  PrismaClient
} = require('@prisma/client')
const prisma = new PrismaClient()

const main = async () => {
  for (let index = 0; index < 32797; index++) {
    await prisma.users.create({
      data: {
        name: '' + index
      }
    })
  }
  
}

main()
.catch(err => console.log(err))
.finally(() => console.log('Seeding'))