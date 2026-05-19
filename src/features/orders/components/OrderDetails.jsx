import React from 'react';
import { useOrders } from '../hooks/useGetOrders';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPrint, FaArrowRight } from 'react-icons/fa';
import Barcode from 'react-barcode';

function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { orderById, isLoadingSingle } = useOrders(id);
    const order = orderById || null;






    if (isLoadingSingle) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-600"></div>
        </div>
    );

    if (!order) return <div className="text-gray-600 p-10 text-center font-sans">لا توجد بيانات لهذا الأوردر</div>;

    const handlePrint = () => window.print();
    const orderId = order.barcode || '0000';
    const orderDate = order.createdAt ? new Date(order.createdAt) : new Date();

    return (
        <div className="min-h-screen bg-gray-100 py-6 font-sans select-none selection:bg-amber-100" dir="rtl">

            {/* Control Panel - Navigation & Print (Hidden in printing) */}
            <div className="max-w-[80mm] mx-auto flex justify-between items-center mb-4 px-2 no-print">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-black transition-colors text-xs font-bold"
                >
                    <FaArrowRight className="text-[10px]" /> عودة للقائمة
                </button>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-all shadow-md text-xs font-bold"
                >
                    <FaPrint /> طباعة الفاتورة
                </button>
            </div>

            {/* Main Receipt Container (80mm Standard Size) */}
            <div className="w-[80mm] mx-auto bg-white border border-gray-200 p-4 shadow-sm printable-receipt text-black">

                {/* Header - Brand Identity */}
                <div className="text-center border-b-2 border-black pb-3 mb-3">
                    <h2 className="text-xl font-black mb-1">شركة  آل عامر أبو الدهب</h2>
                    <p className="text-[10px] font-bold text-gray-700">جميع أنواع زيوت السيارات والفلاتر</p>
                    <p className="text-[10px] font-bold text-gray-700">تغيير زيت | فلاتر | تشحيم | مغسلة سيارات</p>

                    <div className="mt-2 text-[9px] text-gray-600 font-medium">
                        <p>الجيزة، مطار إمبابة - أول شارع الكيلاني</p>
                    </div>
                    <div className="mt-1 py-1 border-y border-gray-100 flex justify-between items-center text-[9px]">
                        <div className="flex gap-1 items-center">
                            <span className="font-bold text-gray-900">محمد السيد :</span>
                            <span className="font-mono">01144472233</span>
                        </div>
                        <div className="w-[1px] h-3 bg-gray-300"></div>
                        <div className="flex gap-1 items-center">
                            <span className="font-bold text-gray-900">إبراهيم علي :</span>
                            <span className="font-mono">01279373024</span>
                        </div>
                    </div>


                </div>

                {/* Order Meta Info */}
                <div className="grid grid-cols-2 gap-y-1 text-[11px] mb-4 pb-2 border-b border-dashed border-gray-300">
                    <p><span className="text-gray-500">رقم الفاتورة:</span> <span className="font-bold">#{orderId}</span></p>
                    <p className="text-left"><span className="text-gray-500">التاريخ:</span> {orderDate.toLocaleDateString('ar-EG')}</p>
                    <p><span className="text-gray-500">العميل:</span> <span className="font-bold">{order.customer || 'عميل نقدي'}</span></p>
                    <p className="text-left"><span className="text-gray-500">الوقت:</span> {orderDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</p>
                    <p className="col-span-2"><span className="text-gray-500">الحالة:</span> <span className="font-black text-xs text-stone-900 bg-gray-100 px-1.5 rounded">{order.status_order?.toUpperCase() || "PAID"}</span></p>
                </div>

                {/* Items Table */}
                <table className="w-full mb-4 text-[12px]">
                    <thead>
                        <tr className="border-b border-black text-right">
                            <th className="pb-1 font-black">الصنف</th>
                            <th className="pb-1 text-center font-black">كمية</th>
                            <th className="pb-1 text-left font-black">إجمالي</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {order.order_items?.map((item) => (
                            <tr key={item.id}>
                                <td className="py-2 pr-1">
                                    <span className="block font-bold leading-none">{item.product?.name}</span>
                                    {item.product?.documentId && (
                                        <span className="text-[13px] text-gray-500 block mt-0.5 ">
                                            {item.product.attributes?.[0]?.name}
                                        </span>
                                    )}
                                </td>
                                <td className="py-2 text-center font-bold">x{item.quantityInOrder}</td>
                                <td className="py-2 text-left font-bold">
                                    {(item.sub_total || 0).toLocaleString('ar-EG')} ج.م
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Financial Calculations Summary */}
                <div className="border-t-2 border-black pt-2 mt-2">
                    <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-medium">
                            <span>الإجمالي الفرعي:</span>
                            <span>{(order.total_price || 0).toLocaleString('ar-EG')} ج.م</span>
                        </div>

                        {order?.update_price ?
                            <div className="flex justify-between text-[11px] font-bold text-gray-700 ">
                                <span>فرق السعر (+):</span>
                                <span>+{order.update_price.toLocaleString('ar-EG')} ج.م</span>
                            </div>
                            :
                            ""
                        }

                        {order.discount > 0 && (
                            <div className="flex justify-between text-[11px] text-red-600 font-bold">
                                <span>الخصم (-):</span>
                                <span>-{(order.discount || 0).toLocaleString('ar-EG')} ج.م</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center text-black border-t-2 border-black border-double pt-1.5 mt-2 px-1">
                        <span className="text-[13px] font-black uppercase">صافي المطلوب</span>
                        <span className="text-xl font-black tracking-tighter">
                            {(order.final_price || 0).toLocaleString('ar-EG')}
                            <small className="text-[10px] mr-1">ج.م</small>
                        </span>
                    </div>

                    {/* خط قفل الحسابات لضمان عدم التداخل مع ما بعده */}
                    <div className="border-b border-black mt-1"></div>
                </div>
                {/* Footer Section & Barcode */}
                <div className="mt-6 flex flex-col items-center">
                    <div style={{ direction: 'ltr' }} className="w-full flex justify-center">
                        <Barcode
                            value={orderId}
                            width={1.2}
                            height={30}
                            fontSize={10}
                            background="transparent"
                            margin={0}
                        />
                    </div>

                    <p className="mt-4 text-[9px] font-bold text-gray-500">شكراً لثقتكم في أولاد آل عامر أبو الدهب</p>

                    {/* Developer Signature Stamp */}
                    <div className="mt-4 pt-2 border-t border-gray-100 w-full flex justify-between items-center opacity-30">
                        <span className="text-[7px] tracking-[2px]">SYS V.1.0</span>
                        <div className="text-right">
                            <p className="text-[8px] font-black uppercase"> System Architect || 01128787885 </p>
                            <p className="text-[6px] italic"></p>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
    @media print {
        /* 1. إخفاء كل شيء في الصفحة */
        body * {
            visibility: hidden;
        }
        
        /* 2. إظهار منطقة الريسيت فقط وما بداخلها */
        .printable-receipt, .printable-receipt * {
            visibility: visible;
        }
        
        /* 3. تحديد مكان الريسيت في أعلى الصفحة تماماً */
        .printable-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 80mm !important;
            margin: 0 !important;
            padding: 5mm !important;
            border: none !important;
            box-shadow: none !important;
        }

        .no-print, nav, header, footer, button {
            display: none !important;
        }

        @page {
            size: 80mm auto;
            margin: 0;
        }
    }
`}} />
        </div>
    );
}

export default OrderDetails;