const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const passwordHash = await bcrypt.hash('password123', 10)

    // Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@eqc.com' },
        update: {},
        create: {
            email: 'admin@eqc.com',
            passwordHash,
            role: 'ADMIN',
        },
    })
    console.log({ admin })

    // Staff
    const staff = await prisma.user.upsert({
        where: { email: 'staff@eqc.com' },
        update: {},
        create: {
            email: 'staff@eqc.com',
            passwordHash,
            role: 'STAFF',
            staffProfile: {
                create: {
                    firstName: 'John',
                    lastName: 'Doe',
                    roles: 'PSW, Driver',
                    skills: 'CPR, Lifting'
                }
            }
        },
    })
    console.log({ staff })

    // Client
    const client = await prisma.user.upsert({
        where: { email: 'client@eqc.com' },
        update: {},
        create: {
            email: 'client@eqc.com',
            passwordHash,
            role: 'CLIENT',
            clientProfile: {
                create: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                    address: '123 Main St',
                    needs: 'Companionship'
                }
            }
        },
    })
    console.log({ client })
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
