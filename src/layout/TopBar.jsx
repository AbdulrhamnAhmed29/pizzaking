import { useState, useRef } from 'react'
import { ExternalLink, Bell } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useNotifications } from '../shared/context/NotificationContext'
import { useEffect } from 'react';


const TopBar = ({ isCollapsed }) => {
    const location = useLocation();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const notifRef = useRef(null);
    const { lowStockProducts, lowStockCount } = useNotifications();

    const getPageTitle = (pathname) => {
        const titles = {
            '/dashboard': 'لوحة الإحصائيات',
            '/pos': 'نقطة البيع',
            '/products': 'إدارة المنتجات',
            '/add-products': 'إضافة منتج',
            '/restock': 'المنتجات الناقصة',
            '/Sales': 'المبيعات',
            '/expense': 'المصاريف',
        };
        return titles[pathname] || 'لوحة التحكم';
    };


    useEffect(() => {
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isNotifOpen]);

    return (
        <header
            dir="rtl"
            className={`
                fixed top-0 left-0 right-0 h-20 z-30 flex items-center justify-between px-6 lg:px-10 
                bg-white/80 backdrop-blur-xl border-b border-zinc-100 transition-all duration-500 ease-in-out
                ${isCollapsed ? 'lg:right-20' : 'lg:right-64 xl:right-72'}
            `}
        >
            <div className="flex items-center gap-4">
                <div className="h-10 w-[4px] bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]/50  " />
                <div className="lg:flex flex-col text-right hidden  ">
                    <h1 className="text-lg font-black text-zinc-900 leading-none">
                        {getPageTitle(location.pathname)}
                    </h1>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1 tracking-wider">Premium Dashboard</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className={`p-2.5 rounded-xl transition-all ${isNotifOpen ? 'bg-zinc-900 text-white' : 'bg-zinc-50 text-zinc-500 hover:bg-zinc-100'}`}
                    >
                        <Bell size={20} />
                        {lowStockCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-pulse">
                                {lowStockCount}
                            </span>
                        )}
                    </button>

                    {isNotifOpen && (
                        <div className="absolute top-16 left-0 w-[350px] backdrop-blur-2xl bg-white border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden animate-in fade-in zoom-in-95 duration-300 ring-1 ring-black/5">
                            {/* Header Section */}
                            <div className="relative p-5 bg-white border-b border-zinc-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </div>
                                    <h3 className="font-black text-sm text-zinc-800 tracking-tight">
                                        التنبيهات العاجلة
                                    </h3>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-1 bg-zinc-950 text-white rounded-lg">
                                    {lowStockProducts?.length || 0}
                                </span>
                            </div>

                            {/* Content Section */}
                            <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-3">
                                {lowStockProducts?.length > 0 ? (
                                    <div className="space-y-2">
                                        {lowStockProducts.map((p, index) => (
                                            <div
                                                key={index}
                                                className="group relative p-3 rounded-2xl shadow-md transition-all duration-200 bg-zinc-50 border border-transparent border-stone-300"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="text-sm font-bold text-zinc-900 line-clamp-1 group-hover:text-red-600 transition-colors">
                                                            {p.name} ({p.attributes?.[0]?.name})
                                                        </p>
                                                        <span className="text-[10px] font-medium text-zinc-8    00 uppercase tracking-wider">
                                                            {p.parent_id === null ? " سائب" : " قطع"}
                                                        </span>
                                                    </div>
                                                    <div className="bg-red-700 text-white text-[10px] px-2 py-1 rounded-md font-black">
                                                        {p.parent_id === null ? p.bulk_quantity : p.quantity}
                                                        {p.parent_id === null ? " كجم" : " قطعة"}
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-16 px-6 text-center flex flex-col items-center">
                                        <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-8 h-8 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                            </svg>
                                        </div>
                                        <p className="text-zinc-800 font-bold text-sm">المخزون مكتمل</p>
                                        <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                                            جميع المنتجات متوفرة حالياً بكميات آمنة.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Footer Section */}
                            {lowStockProducts?.length > 0 && (
                                <div className="p-3 bg-zinc-50/50 border-t border-zinc-100">
                                    <button className="w-full py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-950 hover:text-white transition-all duration-300 shadow-sm">
                                        <Link to={"/restock"}> عرض تقرير النواقص الكامل</Link>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <Link to="/pos" className="hidden sm:block">
                    <button className="bg-zinc-900 text-white px-5 py-2.5 rounded-xl font-black text-[11px] hover:bg-stone-800 transition-all active:scale-95 flex items-center gap-2">
                        نقطة بيع سريعة
                        <ExternalLink size={14} className="text-[#D4AF37]" />
                    </button>
                </Link>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        </header>
    );
};

export default TopBar;