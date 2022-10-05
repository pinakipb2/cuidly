import { faker } from '@faker-js/faker';
import prisma from 'prisma';
import userTier from './userTier';

/*
username
password -> guest not needed
IP
accountType -> enum(GUEST, FREE, PREMIUM)

Creating 10 records each
*/

// const [users, totalUsers] = await prisma.$transaction([prisma.User.createMany({ where: { title: { contains: 'prisma' } } }), prisma.User.count()]);

function randomDate(start, end) {
  return Math.floor(Math.random()) === 0 ? new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())) : new Date(today.setDate(today.getDate() - 5));
}

const seedFakeData = async () => {
  const userTypes = [userTier.GUEST, userTier.FREE, userTier.PREMIUM];
  const data = [];
  for (let i = 0; i < userTypes.length; i++) {
    for (let j = 0; j < 5; j++) {
      if (i == 0) {
        const obj = {
          username: faker.internet.userName(),
          IP: faker.internet.ip(),
          accountType: userTypes[i],
          createdAt: randomDate(new Date(2022, 3, 1), new Date()),
        };
        data.push(obj);
      } else {
        const obj = {
          username: faker.internet.userName(),
          password: faker.internet.password(),
          IP: faker.internet.ip(),
          accountType: userTypes[i],
          createdAt: randomDate(new Date(2022, 3, 1), new Date()),
        };
        data.push(obj);
      }
    }
  }
  console.table(data);
  const users = await prisma.User.createMany({ data });
  console.log(users);
};

seedFakeData();
