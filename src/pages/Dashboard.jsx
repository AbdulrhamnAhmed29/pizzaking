import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    UtensilsCrossed,
   
    Users,
    LogOut,
    Menu,
    X,
    Bell,
    UserCircle
} from 'lucide-react';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { name: 'الرئيسية', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'إدارة الفئات ', path: '/products', icon: <UtensilsCrossed size={20} /> },
        { name: 'إدارة الاقسام', path: '/products', icon: <UtensilsCrossed size={20} /> },
        { name: 'إدارة المنتجات ', path: '/products', icon: <UtensilsCrossed size={20} /> },
        { name: 'إدارة العروض  ', path: '/products', icon: <UtensilsCrossed size={20} /> },
        { name: 'الموظفين', path: '/users', icon: <Users size={20} /> },
    ];

    return (
        <div className="flex min-h-screen bg-[#050505] text-white" dir="rtl">
            {/* Sidebar - Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Component */}
            <aside className={`fixed inset-y-0 right-0 z-50 w-72 transform bg-[#0a0a0a] border-l border-zinc-800 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex h-full flex-col">
                    {/* Logo Section */}
                    <div className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA8A2E] flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <UtensilsCrossed className="text-black" size={24} />
                            </div>
                            <span className="text-xl font-black bg-gradient-to-l from-[#D4AF37] to-[#FBF089] bg-clip-text text-transparent">
                               (Pizza King) 
                            </span>
                        </div>
                        <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2 px-4 py-6">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${location.pathname === item.path
                                    ? 'bg-gradient-to-l from-[#D4AF37]/20 to-transparent text-[#D4AF37] border-r-4 border-[#D4AF37]'
                                    : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'
                                    }`}
                            >
                                <span className={`${location.pathname === item.path ? 'text-[#D4AF37]' : 'group-hover:text-white'}`}>
                                    {item.icon}
                                </span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Logout Section */}
                    <div className="p-4 border-t border-zinc-800">
                        <button className="flex w-full items-center gap-4 px-4 py-3.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
                            <LogOut size={20} />
                            <span className="font-medium">تسجيل الخروج</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800 px-6 flex items-center justify-between sticky top-0 z-30">
                    <button className="lg:hidden p-2 text-zinc-400" onClick={() => setIsSidebarOpen(true)}>
                        <Menu size={28} />
                    </button>

                    <div className="hidden lg:block">
                        <h2 className="text-zinc-400 font-medium">أهلاً بك، <span className="text-white">عبدالرحمن</span> 👋</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-[#D4AF37] transition-colors border border-zinc-800">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border border-black"></span>
                        </button>

                        <div className="h-10 w-[1px] bg-zinc-800 mx-2"></div>

                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-left hidden sm:block">
                                <p className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">عبدالرحمن أحمد</p>
                                <p className="text-[10px] text-zinc-500 text-right font-mono">SUPER ADMIN</p>
                            </div>
                            <div className="h-10 w-10 rounded-full border-2 border-zinc-800 p-0.5 group-hover:border-[#D4AF37] transition-all">
                                <div className="h-full w-full rounded-full bg-zinc-800 flex items-center justify-center">
                                    <UserCircle size={24} className="text-zinc-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Outlet */}
                <main className="p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;