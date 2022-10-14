import React from 'react';
import MainContent from '../components/screen/Dashboard';
import goToThisIfUserAuthenticated from '../HOC/goToThisIfUserAuthenticated';

const Dashboard = () => {
  return (
    <>
      <MainContent />
    </>
  );
};

export default goToThisIfUserAuthenticated(Dashboard);
