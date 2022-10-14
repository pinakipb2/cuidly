import React from 'react';
import DashboardContent from './Content';
import DashboardNavbar from './Navbar';
import DashboardSidebar from './Sidebar';

const MainContent = () => {
  return (
    <div className="h-screen flex flex-col">
      <DashboardNavbar />
      <div className="flex flex-grow w-full">
        <div className="w-1/5 bg-gray-50 border-r-2 border-gray-300">
          <DashboardSidebar />
        </div>
        <div className="w-full bg-gradient-to-r from-white to-indigo-100">
          <DashboardContent />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
