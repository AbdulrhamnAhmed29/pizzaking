import { User, ExternalLink } from 'lucide-react'

const TopBar = () => {
    return (
        <div 
            dir="rtl" 
            className="fixed top-0 left-0 right-20 h-16 z-30 flex items-center justify-between px-8 
                       bg-[#050505] border-b border-white/10
                       shadow-[0_4px_20px_rgba(255,255,255,0.03)]"
        >
            {/* الجهة اليمنى: البروفايل */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 pl-6 border-l border-zinc-800/50">
                    {/* الصورة الشخصية: أبيض وأسود سادة */}
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform hover:scale-105 cursor-pointer">
                        <User size={20} className="text-black" />
                    </div>
                    
                    <div className="text-right">
                        <p className="text-sm font-bold text-white tracking-wide">أهلاً، مستر أدمن</p>
                        <p className="text-[10px] text-zinc-500 uppercase font-medium tracking-tighter">إدارة القائمة بالكامل</p>
                    </div>
                </div>
            </div>

            {/* الجهة اليسرى: زر الذهاب للمنيو بتصميم مونوكروم (Monochrome) */}
            <div className="flex items-center gap-2">
                <button className="group flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full font-bold text-xs transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95">
                    <span>الذهاب للمنيو</span>
                    <ExternalLink size={14} className="group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform" />
                </button>
            </div>

            {/* لمسة فنية: توهج أبيض خفيف جداً في أعلى البار */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
    )
}

export default TopBar