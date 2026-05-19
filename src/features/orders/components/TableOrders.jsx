import React, { useEffect, useRef, } from 'react';
import { useOrders } from "../../orders/hooks/useGetOrders";
import * as XLSX from 'xlsx';
import { Search, Download, Eye, Pencil, Trash2, Filter, } from 'lucide-react';
import { useOrderMutation } from '../hooks/useMutationOrders';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


function SalesOrder() {
    const { remove } = useOrderMutation()
    const {
        orders,
        searchItem,
        setSearchitem,
        setStatus,
        status,
        isLoading,
        selectedDate,
        setSelectedDate,


    } = useOrders();
    console.log(orders);
    


    const totalSales = orders?.reduce((acc, order) => acc + (order.final_price || 0), 0) || 0;
    const totalDiscounts = orders?.reduce((acc, order) => acc + (order.discount || 0), 0) || 0;
    const totalOrders = orders?.length || 0;

    const handleRemove = (id) => {
        Swal.fire({
            title: 'هل أنت متأكد؟',
            text: "بمجرد الحذف، سيتم خصم قيمة هذه الفاتورة من إجمالي المبيعات نهائياً!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'نعم، احذف الآن',
            cancelButtonText: 'إلغاء',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                remove(id);

            }
        });
    };

    const searchInputRef = useRef(null);

    useEffect(() => {
        searchInputRef.current?.focus();
    }, []);


    // ... (handleExportExcel 
    const handleExportExcel = () => {

        if (!orders || orders.length === 0) return;



        const dataToExport = orders.map(order => ({

            "رقم الفاتورة": order.barcode,

            "العميل": order.customer || "عميل نقدي",

            "طريقة الدفع": order.status_order,

            "الإجمالي": order.total_price,

            "الخصم": order.discount,

            "الصافي": order.final_price,

            "التاريخ": new Date(order.createdAt).toLocaleDateString('ar-EG')

        }));



        const worksheet = XLSX.utils.json_to_sheet(dataToExport);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "المبيعات");

        const fileName = `مبيعات_يوم__بتاريخ_${new Date().toISOString().split('T')[0]}.xlsx`;

        XLSX.writeFile(workbook, fileName);

    };



    return (
        <div className="w-full min-h-screen bg-[#fcfcfc] p-4 md:p-8 font-arabic text-right" dir="rtl">

            {/* Top Stats Section - Sleek & Modern */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">إجمالي الطلبات</p>
                            <h3 className="text-3xl font-black text-zinc-800">{totalOrders}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl ">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">إجمالي المبيعات</p>
                            <h3 className="text-3xl font-black text-zinc-800 font-sans">
                                {totalSales.toLocaleString()} <span className="text-sm font-medium text-gray-400">ج.م</span>
                            </h3>
                        </div>
                        <div className="p-3 bg-green-50 rounded-xl">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">إجمالي الخصومات</p>
                            <h3 className="text-3xl font-black  font-sans">
                                {totalDiscounts.toLocaleString()} <span className="text-sm font-medium text-gray-400">ج.م</span>
                            </h3>
                        </div>
                        <div className="p-3 bg-red-50 rounded-xl ">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
            {/* Actions & Filters Bar */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mb-6">
                <div className="flex flex-col xl:flex-row justify-between items-center gap-5">

                    <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                        {/* Modern Search */}
                        <div className="relative flex-grow md:flex-initial">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                            <input
                                type="text"
                                value={searchItem}
                                placeholder="ابحث بالاسم أو الباركود..."
                                className="w-full md:w-72 pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 outline-none transition-all text-sm"
                                onChange={(e) => setSearchitem(e.target.value)}
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                            <select
                                value={status}
                                className="pr-9 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 outline-none text-sm font-bold text-gray-600 appearance-none cursor-pointer"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="الكل">كل الحالات</option>
                                <option value="كاش">كاش</option>
                                <option value="آجل">آجل</option>
                            </select>
                        </div>

                        {/* Date Filter */}
                        <div className="relative">
                            <input
                                type="date"
                                value={selectedDate}
                                className="pr-2 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 outline-none text-sm font-sans"
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleExportExcel}
                        className="w-full xl:w-auto flex items-center justify-center gap-2 bg-zinc-900 text-white px-8 py-3 rounded-xl hover:bg-black transition-all text-sm font-black shadow-lg shadow-zinc-200 active:scale-95"
                    >
                        <Download size={18} />
                        تصدير البيانات
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase">رقم الفاتورة</th>
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase">العميل</th>
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase text-center">نوع الدفع</th>
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase text-center">الخصم</th>
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase text-center">الصافي النهائي</th>
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase text-center">توقيت العملية</th>
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase text-center">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders?.map((order) => (
                                <tr key={order.id} className="hover:bg-amber-50/20 transition-colors group">
                                    <td className="py-5 px-6">
                                        <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold font-sans text-gray-600 group-hover:bg-white transition-colors">
                                            {order.barcode}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6">
                                        <p className="text-sm font-black text-gray-800">{order.customer || "عميل نقدي"}</p>
                                    </td>
                                    <td className="py-5 px-6 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-wide ${order.status_order === 'كاش' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                                            {order.status_order}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6 text-center text-sm font-bold text-red-500 font-sans leading-none">
                                        {order.discount} <small className="text-[10px]">ج.م</small>
                                    </td>
                                    <td className="py-5 px-6 text-center">
                                        <span className="text-sm font-black text-zinc-900 font-sans bg-zinc-50 px-3 py-1 rounded-md">
                                            {order.final_price?.toLocaleString()} <small className="text-[10px]">ج.م</small>
                                        </span>
                                    </td>
                                    <td className="py-5 px-6 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-bold text-gray-700">{new Date(order.createdAt).toLocaleDateString('ar-EG', {
                                                weekday: 'long', day: 'numeric',
                                                month: 'long',
                                            })}</span>
                                            <span className="text-[10px] text-gray-400 font-sans uppercase">{new Date(order.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center justify-center gap-1">
                                            <Link to={`/orderDetails/${order.documentId}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="عرض">
                                                <Eye size={18} />
                                            </Link>
                                            <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all" title="تعديل">
                                                <Link to={`/update_order/${order.documentId}`}>
                                                    <Pencil size={18} />
                                                </Link>
                                            </button>
                                            <button onClick={() => handleRemove(order.documentId)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="حذف">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {orders?.length === 0 && !isLoading && (
                        <div className="flex flex-col items-center justify-center p-20 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Search className="text-gray-200" size={40} />
                            </div>
                            <h4 className="text-gray-800 font-black mb-1">لا توجد نتائج!</h4>
                            <p className="text-gray-400 text-sm">جرب البحث بكلمات أخرى أو تغيير الفلاتر</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SalesOrder;