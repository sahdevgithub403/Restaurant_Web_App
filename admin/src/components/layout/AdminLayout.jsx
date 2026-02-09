
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] font-sans flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
         <TopHeader onMenuClick={() => setSidebarOpen(true)} />
         
         <main className="flex-1 p-6 md:p-8 overflow-y-auto overflow-x-hidden">
            <Outlet />
         </main>
      </div>
    </div>
  );
};

export default AdminLayout;
