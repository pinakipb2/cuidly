import React from 'react';
import { useSelector } from 'react-redux';
import Badge from '../../common/Badge';

const DashboardNavbar = () => {
  const accountType = useSelector((state) => state.user.accountType);
  return (
    <div>
      DashboardNavbar
      <Badge accountType={accountType} />
      <br />
      <Badge accountType="FREE" />
    </div>
  );
};

export default DashboardNavbar;
