import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const findUserByEmail = async (email) => {
  const item = await prisma.user.findUnique({where: {email}});
  return item;
}

export const listApiKeysByUser = async (email) => {
  const items = await prisma.apikey.findMany({where: {email}});
  return items;
}

export const findPoint = async (email) => {
  const item = await prisma.point.findUnique({where: {email}});
  return item;
}

export const findApiKey = async (apikey) => {
  const item = await prisma.apikey.findUnique({where: {apikey}});
  return item;
}

export const createApiKey = async (newkey) => {
  const item = await prisma.apikey.create({data: newkey});
  return item;
}

export const deleteApiKey = async (key) => {
  const item = await prisma.apikey.delete({where: {apikey: key}});
  return item;
}

export const createRegistration = async (newItem) => {
  const item = await prisma.registration.create({data: newItem});
  return item;
}
