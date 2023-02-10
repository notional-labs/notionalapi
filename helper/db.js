import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const findUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({where: {email}});
  return user;
}

export const listApiKeysByUser = async (email) => {
  const apikeys = await prisma.apikey.findMany({where: {email}});
  return apikeys;
}
