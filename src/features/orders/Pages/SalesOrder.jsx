import React from 'react';
import { useOrders } from "../../orders/hooks/useGetOrders";

import TableOrders from '../components/TableOrders';
import { Wallet } from 'lucide-react';

function SalesOrder() {
    const {
        orders,
        error,

    } = useOrders();
    if (error) {
        return (
            <div className="p-6 text-center">
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 inline-block">
                    حدث خطأ أثناء تحميل البيانات. يرجى التأكد من الاتصال بالسيرفر.
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-[#fafafa] min-h-screen font-arabic" dir="rtl">

            {/* Header Section */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
                        <Wallet className="text-[#D4AF37]" size={32} />
                        ادارة <span className="text-[#D4AF37] font-outline-2">(المبيعات)</span>
                    </h1>
                    <p className="text-gray-500 flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                        متابعة حية لجميع العمليات والطلبات المسجلة
                    </p>
                </div>
                <div className="bg-white px-5 py-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center text-stone-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">تاريخ اليوم</span>
                        <span className="text-sm font-black text-gray-700 leading-none">
                            {new Date().toLocaleDateString('ar-EG', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                </div>
            </div>


            {/* Orders Data Section */}
            <div className="bg-white rounded-[2.5rem] shadow-lg border border-gray-50 overflow-hidden">


                <div className="p-4">
                    <div className="overflow-x-auto">
                        {/* table orders */}
                        <div className="space-y-4">
                            <TableOrders orders={orders} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SalesOrder;