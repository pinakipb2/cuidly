import React from 'react';
import { useSelector } from 'react-redux';
import DashboardNavbar from './Navbar';

const MainContent = () => {
  const username = useSelector((state) => state.user.username);
  return (
    <div>
      <DashboardNavbar />
      Secret Page !! <br /> Hello {username} !!
    </div>
  );
};

export default MainContent;
