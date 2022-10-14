import React from 'react';
import { useSelector } from 'react-redux';
import { wishMessage } from '../../../lib/wish';

const DashboardContent = () => {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="flex flex-col pt-10">
      <div className="text-center text-3xl font-bold">
        {wishMessage()}, {username}
      </div>
    </div>
  );
};

export default DashboardContent;
