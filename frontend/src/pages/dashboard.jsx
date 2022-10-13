import React from 'react';
import MainContent from '../components/screen/Dashboard';
import goToThisIfUserAuthenticated from '../HOC/goToThisIfUserAuthenticated';

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <MainContent />
    </div>
  );
};

export default goToThisIfUserAuthenticated(Dashboard);
