import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen font-sans selection:bg-[#D4AF37]/30">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-500 ease-in-out">
        <TopBar isCollapsed={isCollapsed} />      
        <main 
            className={`
                flex-1 pt-24 pb-8 transition-all duration-500 ease-in-out
                ${isCollapsed ? 'lg:pr-20' : 'lg:pr-64 xl:pr-72'}
            `}
        >
            <div className="md:px-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Outlet />
            </div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout