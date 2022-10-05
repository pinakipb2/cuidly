import prisma from 'prisma';

const dropFakeData = async () => {
  const users = await prisma.User.deleteMany({});
  console.log(users);
};

dropFakeData();
