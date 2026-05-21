import React from 'react';

export const ThermalReceipt = ({ startDay, endDay, metrics, totalExpenses, netProfit, topSellingProducts }) => {
    const printDate = new Date().toLocaleString('ar-EG', { hour12: true });

    return (
        <div className="thermal-receipt-container hidden print:block w-[80mm] p-4 bg-white text-black text-xs dir-rtl text-right mx-auto font-sans antialiased">
            <style>{`
                .thermal-receipt-container {
                    font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
                    font-weight: 500;
                }
                .thermal-receipt-container font-bold, 
                .thermal-receipt-container th, 
                .thermal-receipt-container h1, 
                .thermal-receipt-container h3 {
                    font-weight: 800 !important;
                }
            `}</style>

            <div className="text-center mb-4">
                <h1 className="text-xl font-bold">إدارة الزيوت</h1>
                <p className="text-[11px] text-gray-700 font-bold">تقرير مبيعات وأرباح الفترة</p>
                <p className="text-[10px] text-gray-600 font-bold">من: {startDay} | إلى: {endDay}</p>
                <div className="border-b border-dashed border-black my-2"></div>
            </div>

            <div className="space-y-1.5 text-[12px]">
                <div className="flex justify-between"><span>إجمالي المبيعات:</span> <span className="font-bold">{metrics.sales.toLocaleString()} ج.م</span></div>
                <div className="flex justify-between"><span>الاجل (ديون):</span> <span className="font-bold">{metrics.debt.toLocaleString()} ج.م</span></div>
                <div className="flex justify-between"><span>المصروفات:</span> <span className="font-bold">{totalExpenses.toLocaleString()} - ج.م</span></div>
                <div className="flex justify-between"><span>الدرج (الخزنة):</span> <span className="font-bold">{(metrics.received - totalExpenses).toLocaleString()} ج.م</span></div>
                <div className="border-b border-dotted border-black my-1"></div>
                <div className="flex justify-between font-bold text-sm"><span>صافي الربح:</span> <span className="text-base font-bold">{netProfit.toLocaleString()} ج.م</span></div>
                <div className="border-b border-dotted border-black my-1"></div>
                <div className="flex justify-between text-[11px] text-gray-800"><span>إجمالي الطلبات:</span> <span>{metrics.count} طلب</span></div>
                <div className="flex justify-between text-[11px] text-gray-700"><span>طلبات كاش:</span> <span>{metrics.cashCount}</span></div>
                <div className="flex justify-between text-[11px] text-gray-700"><span>طلبات أجل:</span> <span>{metrics.creditCount}</span></div>
            </div>

            <div className="border-b border-dashed border-black my-3"></div>

            <div>
                <h3 className="font-bold text-center mb-2 text-[12px]">المنتجات أكثر ربحية</h3>
                <table className="w-full text-right text-[11px]">
                    <thead>
                        <tr className="border-b-2 border-black font-bold text-black">
                            <th className="pb-1 text-right">المنتج</th>
                            <th className="pb-1 text-center">الكمية المباعة</th>
                            <th className="pb-1 text-left">الربح</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topSellingProducts.map((product, i) => (
                            <tr key={i} className="border-b border-gray-300 text-black">
                                <td className="py-1.5 max-w-[110px] truncate font-medium">{product.name} ({product.size})</td>
                                <td className="py-1.5 text-center font-medium">{product.totalQty}</td>
                                <td className="py-1.5 text-left font-bold">{product.totalProfit.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="text-center mt-6 text-[10px] text-gray-600">
                <div className="border-b border-dashed border-black mb-2"></div>
                <p className="font-medium">تاريخ الطباعة: {printDate}</p>
                <p className="font-bold mt-1 text-black text-[11px]">نظام POS إدارة الزيوت الذكي</p>
            </div>
        </div>
    );
};