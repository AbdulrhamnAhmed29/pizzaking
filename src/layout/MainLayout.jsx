import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const MainLayout = () => {
  return (
    <div className="flex bg-[#050505] min-h-screen text-zinc-100">
      <Sidebar />
      <div className="flex-1 mr-20">
        <TopBar />
        <main className="pt-20 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
