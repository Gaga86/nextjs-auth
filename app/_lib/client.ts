import { PrismaClient } from '@prisma/client'

// Workaround for hot reloading in development: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;