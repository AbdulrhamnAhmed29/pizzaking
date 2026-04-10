import { useState, useEffect, useRef } from 'react'
import { Menu, LogOut, LayoutDashboard, UtensilsCrossed, Layers, ShoppingCart, Zap, DollarSign, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../features/auth'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true)
    const sidebarRef = useRef(null)
    const logout = useLogout()
    const location = useLocation()

    // مصفوفة الروابط مع تصحيح الهمزات والمسميات
    const menuItems = [
        { path: '/dashboard', label: 'الإحصائيات', icon: LayoutDashboard },
        { path: '/categories', label: 'إدارة الفئات', icon: Layers },
        { path: '/sections', label: 'إدارة الأقسام', icon: UtensilsCrossed },
        { path: '/products', label: 'إدارة المنتجات', icon: ShoppingCart },
        { path: '/offers', label: 'إدارة العروض', icon: Zap },
        { path: '/finance', label: 'إدارة الأسعار', icon: DollarSign },
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const isActive = (path) => location.pathname === path

    return (
        <>
            {/* طبقة التعتيم الخلفية للموبايل */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity lg:hidden" />
            )}

            <div
                ref={sidebarRef}
                dir="rtl"
                className={`${isOpen ? 'w-64' : 'w-20'} 
                bg-[#0a0a0a] h-screen transition-all duration-300 flex flex-col fixed right-0 top-0 z-40 
                shadow-[10px_0_30px_rgba(0,0,0,0.5)] border-l border-white/5`}
            >
                {/* الهيدر (اللوجو واسم المطعم) */}
                <div className="p-4 h-16 border-b border-white/10 flex items-center justify-between">
                    {isOpen ? (
                        <div className="flex items-center gap-2 overflow-hidden">
                            <div className="w-10 h-10 flex-shrink-0">
                                <img 
                                    src="/images/logo.png" 
                                    alt="بيتزا كينج لوجو" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="text-right whitespace-nowrap">
                                <p className="font-bold text-white leading-tight">بيتزا كينج</p>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">The King</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-10 h-10 mx-auto">
                            <img src="/images/logo.png" alt="لوجو" className="w-full h-full object-contain" />
                        </div>
                    )}

                    {/* زر الإغلاق يظهر في الموبايل فقط */}
                    {isOpen && (
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 hover:bg-zinc-900/80 text-zinc-500 hover:text-white rounded-md transition-colors lg:hidden"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* زر الفتح يظهر فقط عندما يكون السايد بار مغلقاً */}
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-3 mx-auto mt-4 hover:bg-zinc-900/50 rounded-xl text-white transition-all shadow-glow"
                    >
                        <Menu size={24} />
                    </button>
                )}

                {/* قائمة الروابط */}
                <nav className="flex-1 p-4 space-y-2 mt-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.path)
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 relative group 
                                ${active
                                    ? 'bg-gradient-to-l from-white/10 to-transparent text-white border border-white/20'
                                    : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-white'
                                }`}
                                title={!isOpen ? item.label : ''}
                            >
                                {/* مؤشر النشاط الجانبي */}
                                {active && (
                                    <span className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-white rounded-l-full shadow-[0_0_10px_white]" />
                                )}

                                <Icon size={20} className={`${active ? 'text-white' : 'group-hover:text-white transition-colors'}`} />
                                {isOpen && <span className="text-sm font-semibold">{item.label}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* زر تسجيل الخروج */}
                <div className="p-4 mt-auto border-t border-white/5">
                    <button
                        onClick={logout}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-red-950/10 text-red-500 
                        hover:bg-red-600 hover:text-white transition-all duration-300 text-sm font-bold 
                        ${!isOpen && 'justify-center'}`}
                        title="تسجيل الخروج"
                    >
                        <LogOut size={20} />
                        {isOpen && <span>تسجيل الخروج</span>}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar