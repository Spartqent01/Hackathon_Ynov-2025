import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';


import prisma from '../src/db'
async function main() {
  const hashedPassword = await bcrypt.hash('adminPassword123', 10);

  await prisma.user.upsert({
    where: { user_id: 'P0001' },
    update: {},
    create: {
      user_id: 'P0001',
      name: 'Admin Name',
      username: 'adminuser',
      email: 'admin@example.com',
      password: hashedPassword,
      role: UserRole.ADMIN, // Utilisation de l'enum fourni par Prisma
    },
  });

  console.log('Admin user seeded');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
