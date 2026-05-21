import React from 'react'
import { AlertTriangle, Package, Droplets, } from 'lucide-react'
import { useNotifications } from '../../../shared/context/NotificationContext'
import { ReceiptText, } from 'lucide-react';
const RestockPage = () => {
    const { lowStockProducts } = useNotifications();
    console.log(lowStockProducts);
    
    return (
        <div className="min-h-screen w-full pt-8 pb-20 px-4 lg:px-8 font-sans" dir="rtl">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
                        <ReceiptText className="text-[#D4AF37]" size={32} />
                        قائمة <span className="text-[#D4AF37] font-outline-2">(النواقص)</span>
                    </h1>
                    <p className="text-zinc-400 font-bold text-sm mr-6">متابعة دقيقة للمنتجات التي شارفت على النفاذ</p>
                </div>
                {/* Counter Card */}
                <div className="bg-white border border-zinc-100 shadow-xl shadow-red-500/5 rounded-[2rem] px-8 py-5 flex items-center gap-5 transition-transform hover:scale-[1.02]">
                    <div className="bg-red-50 p-3 rounded-2xl">
                        <AlertTriangle size={28} className="text-red-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-zinc-900 leading-none">{lowStockProducts.length}</p>
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mt-1">منتج يحتاج توريد</p>
                    </div>
                </div>
            </div>
            {lowStockProducts.length === 0 ? (
                /* Empty State Premium View */
                <div className="flex flex-col items-center shadow-custom justify-center py-32 bg-white rounded-[3rem] border border-zinc-50 ">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-emerald-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                        <div className="relative bg-emerald-50 w-28 h-28 rounded-[2.5rem] flex items-center justify-center text-emerald-500 shadow-inner">
                            <Package size={54} strokeWidth={1.5} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-zinc-900 mb-2">المخزن في حالة مثالية</h3>
                    <p className="text-zinc-400 font-medium max-w-xs text-center leading-relaxed">لا توجد أي نواقص حالياً، جميع المنتجات متوفرة بكميات آمنة.</p>
                </div>
            ) : (
                /* Grid Layout */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {lowStockProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white border border-zinc-50 rounded-[2.5rem] overflow-hidden shadow-xl shadow-zinc-200/40 shadow-custom hover:shadow-[#D4AF37]/10 hover:-translate-y-2 transition-all duration-500 group"
                        >
                            {/* Card Header */}
                            <div className="p-8 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[9px] bg-zinc-900 text-[#D4AF37] px-4 py-1.5 rounded-full font-black uppercase tracking-widest">
                                        {product.attributes?.[0]?.name || 'صنف عام'}
                                    </span>
                                    <div className="text-red-500 bg-red-50 p-2 rounded-xl">
                                        <Droplets size={18} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-black text-zinc-900 group-hover:text-[#D4AF37] transition-colors leading-snug">
                                    {product.name}
                                </h3>
                            </div>

                            {/* Stock Indicator - UX Focus */}
                            <div className="px-8 py-4 bg-zinc-50/50 flex items-center justify-between">
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">الكمية الحرجة</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-black">
                                        {product.quantity || product.bulk_quantity || '0'}
                                    </span>
                                    <span className="text-[10px] font-black text-zinc-400">
                                        {product.quantity ? 'جركن' : 'لتر/كيلو'}
                                    </span>
                                </div>
                            </div>

                            {/* Pricing Grid */}
                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-bold text-zinc-400 uppercase mb-1">تكلفة الشراء</span>
                                        <span className="text-sm font-black text-zinc-800">{product.buying_price || '0'} ج.م</span>
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[9px] font-bold text-zinc-400 uppercase mb-1">سعر البيع الحالي</span>
                                        <span className="text-sm font-black text-[#D4AF37]">{product.cost_price || '0'} ج.م</span>
                                    </div>
                                </div>



                                {product.barcode && (
                                    <div className="flex items-center justify-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                        <div className="h-[1px] flex-1 bg-zinc-200"></div>
                                        <span className="text-[9px] font-mono font-bold text-zinc-500 tracking-widest">{product.barcode}</span>
                                        <div className="h-[1px] flex-1 bg-zinc-200"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RestockPage;