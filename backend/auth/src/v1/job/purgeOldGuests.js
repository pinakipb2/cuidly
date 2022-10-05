import { CronJob } from 'cron';
import prisma from 'prisma';
import addSubtractDate from 'lib/addSubtractDate';
import userTier from 'utils/userTier';

const getAllOldGuests = async () => {
  const today = new Date();
  const d = new Date(new Date(addSubtractDate.subtract(today, 9, 'd'))).toISOString(); // TODO: get 10 from redis (minus one for safety)
  console.log({ d, today: new Date().toISOString() });
  const users = await prisma.User.findMany({
    where: {
      AND: [
        {
          createdAt: {
            lt: d,
          },
        },
        {
          accountType: userTier.GUEST,
        },
      ],
    },
  });
  console.log(users.length);
  const ids = users.map((user) => user.id);
  console.log(ids);
};

const onJobCompleted = () => {
  console.log(`Job Ran on ${new Date().toISOString()}`);
};

// At 00:00 (Everyday Midnight) -> 0 0 * * *
const job = new CronJob(
  '* * * * * *',
  async () => {
    await getAllOldGuests();
  },
  onJobCompleted,
  true
);

job.start();
