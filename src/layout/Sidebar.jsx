import { useState } from 'react'
import {
    Menu, LogOut, LayoutDashboard, Droplets, X,
    Wallet, ShoppingCart,
    ChevronRight, ChevronLeft,
    Package,
    Users,
    Receipt
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../features/auth'
import Swal from 'sweetalert2'

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const logout = useLogout()
    const location = useLocation()
    const isActive = (path) => location.pathname === path

    const handleLogout = () => {
        Swal.fire({
            title: 'هل تريد تسجيل الخروج؟',
            text: "سيتم إنهاء الجلسة الحالية والعودة لصفحة الدخول",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#D4AF37',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، سجل الخروج',
            cancelButtonText: 'إلغاء',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                logout()

                Swal.fire({
                    title: 'تم الخروج!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }
    const menuItems = [
        { path: '/pos', label: 'بدء البيع', icon: ShoppingCart },
        { path: '/brands', label: '    البراند والشركات ', icon: Droplets },
        { path: '/products', label: 'المخزون', icon: Package },
        { path: '/clients', label: ' العملاء و المديونية', icon: Users },
        { path: '/Sales', label: 'المبيعات', icon: Receipt },
        { path: '/expense', label: 'المصاريف', icon: Wallet },
        { path: '/dashboard', label: 'الإحصائيات', icon: LayoutDashboard },
    ];


    return (
        <>
            <button
                onClick={() => setIsMobileOpen(true)}
                className="fixed top-4 right-4 z-50 p-2.5 bg-white border border-zinc-200 rounded-xl shadow-lg lg:hidden text-zinc-600 active:scale-90 transition-transform"
            >
                <Menu size={24} />
            </button>

            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside
                dir="rtl"
                className={`
                    fixed top-0 right-0 z-50 h-screen transition-all duration-500 ease-in-out
                    bg-stone-950 border-l border-white/5 shadow-2xl flex flex-col
                    ${isMobileOpen ? 'translate-x-0 w-72' : 'translate-x-full lg:translate-x-0'}
                    ${isCollapsed ? 'lg:w-20' : 'lg:w-64 xl:w-72'}
                `}
            >
                <div className="p-4 h-20 border-b border-white/5 flex items-center justify-between overflow-hidden">
                    <div className="flex items-center gap-3 min-w-max">
                        <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 shrink-0">
                            <Droplets className="text-stone-950" size={22} />
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col animate-in fade-in slide-in-from-right-2 duration-500">
                                <span className="font-black text-white text-sm tracking-tight">ادارة الزيوت</span>
                                <span className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-[0.2em]">Oil Management</span>
                            </div>
                        )}
                    </div>

                    <button onClick={() => setIsMobileOpen(false)} className="lg:hidden p-1 text-zinc-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex absolute -left-3 top-24 w-6 h-6 bg-[#D4AF37] rounded-full items-center justify-center text-stone-950 shadow-xl hover:scale-110 transition-all z-50"
                >
                    {isCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                </button>

                {/*  */}
                <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto custom-scrollbar ">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.path)
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileOpen(false)}
                                title={isCollapsed ? item.label : ""}
                                className={`
                                    flex items-center gap-4 px-3 py-3.5 rounded-2xl transition-all duration-300 group relative
                                    ${active
                                        ? 'bg-[linear-gradient(135deg,#D4AF37_0%,#F3E5AB_100%)]'
                                        : 'text-zinc-400 hover:bg-white/5 hover:text-white'}
                                `}
                            >
                                <Icon size={22} strokeWidth={active ? 2.5 : 2} className="shrink-0 transition-transform group-hover:scale-110" />

                                {!isCollapsed && (
                                    <span className="text-sm font-bold whitespace-nowrap animate-in fade-in duration-300">
                                        {item.label}
                                    </span>
                                )}

                                {active && isCollapsed && (
                                    <div className="absolute right-0 w-1 h-6 bg-[#D4AF37] rounded-l-full shadow-[0_0_8px_#D4AF37]" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className={`
                            w-full flex items-center gap-4 px-3 py-4 rounded-2xl text-red-400 font-bold text-sm
                            hover:bg-red-500/10 transition-all group overflow-hidden
                            ${isCollapsed ? 'justify-center' : ''}
                        `}
                    >
                        <LogOut size={20} className="shrink-0 transition-transform group-hover:-translate-x-1" />
                        {!isCollapsed && <span className="whitespace-nowrap">تسجيل الخروج</span>}
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar