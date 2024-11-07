import React from 'react';
import { Toaster } from 'sonner';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';

const SidebarFrame = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="bottom-right" richColors expand={true} />
      <Sidebar />
      <div className="flex-1 p-5 overflow-y-auto"> {/* keep the sidebar at full height of the screen by the overflow */}
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarFrame;
