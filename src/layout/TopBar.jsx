
import { useLocation } from 'react-router-dom'


const TopBar = ({ isCollapsed }) => {
    const location = useLocation();
   

    const getPageTitle = (pathname) => {
        const titles = {
            '/dashboard': 'لوحة الإحصائيات',
            '/pos': 'نقطة البيع',
            '/products': 'إدارة المنتجات',
            '/add-products': 'إضافة منتج',
            '/Sales': 'المبيعات',
            '/expense': 'المصاريف',
        };
        return titles[pathname] || 'لوحة التحكم';
    };



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

            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
        </header>
    );
};

export default TopBar;