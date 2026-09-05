import { useExpenses } from "../hooks/useExpenses";
import { Wallet, Plus, ReceiptText, Trash2, PencilLine, Search, Filter } from "lucide-react";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import React, { useMemo } from 'react';


function ExpensesPage() {
    const {
        expesnse,
        remove,
        setExpensesDay,
        ExpensesDay,
        setSearchitem,
        searchItem,
        status,
        setStatus
    } = useExpenses();

 const handleDelete = async (id) => {
    // طلب كلمة المرور
    const passwordResult = await Swal.fire({
        title: "صلاحية الحذف",
        text: "أدخل كلمة المرور للمتابعة",
        input: "password",
        inputPlaceholder: "كلمة المرور",
        inputAttributes: {
            maxlength: 4,
            autocapitalize: "off",
            autocorrect: "off",
        },
        showCancelButton: true,
        confirmButtonColor: "#D4AF37",
        cancelButtonColor: "#f44336",
        confirmButtonText: "متابعة",
        cancelButtonText: "إلغاء",
        reverseButtons: true,

        inputValidator: (value) => {
            if (!value) {
                return "من فضلك أدخل كلمة المرور";
            }

            if (value !== "2468") {
                return "كلمة المرور غير صحيحة";
            }

            return null;
        },
    });

    // لو الباسورد غلط أو ضغط إلغاء
    if (!passwordResult.isConfirmed) return;

    // تأكيد الحذف
    const confirmResult = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "لن تتمكن من استعادة هذا المصرف بعد الحذف!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D4AF37",
        cancelButtonColor: "#f44336",
        confirmButtonText: "نعم، احذفه!",
        cancelButtonText: "إلغاء",
        reverseButtons: true,
    });

    if (!confirmResult.isConfirmed) return;

    remove(id);

    Swal.fire({
        title: "تم الحذف!",
        text: "تم حذف المصرف بنجاح.",
        icon: "success",
        confirmButtonColor: "#D4AF37",
        timer: 1500,
        showConfirmButton: false,
    });
};


    const total = useMemo(() => {
        if (!expesnse || !Array.isArray(expesnse)) return 0;

        return expesnse.reduce((accumulator, currentItem) => {
            const price = currentItem?.price ||0;

            return accumulator + Number(price);
        }, 0); 
    }, [expesnse]);
    




    // if (loadingData) return (
    //     <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
    //         <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    //     </div>
    // );

    return (
        <div className="p-4 md:p-8 bg-[#fcfcfc] min-h-screen font-arabic" dir="rtl">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
                        <Wallet className="text-[#D4AF37]" size={32} />
                        المصروفات <span className="text-[#D4AF37] font-outline-2">(الخوارج)</span>
                    </h1>
                    <p className="text-zinc-500 font-medium mt-1">تتبع وإدارة كافة المصاريف التشغيلية</p>
                </div>

                <button className="bg-zinc-900 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-zinc-200">
                    <Plus size={20} />
                    <Link to={"/addexpense"}>
                        إضافة مصروف
                    </Link>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider"> إجمالي الخوارج</p>
                            <h3 className="text-3xl font-black text-zinc-800">{total}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl ">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                    </div>
                </div>

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
                                <option value="الكل">الكل</option>
                                <option value="مصاريف يومية">مصاريف يومية</option>
                                <option value="بضاعة">بضاعة</option>
                                <option value="ميه">ميه</option>
                                <option value="كهربا">كهربا</option>
                                <option value="اجور يومية">اجور يومية</option>
                            </select>
                        </div>

                        {/* Date Filter */}
                        <div className="relative">
                            <input
                                type="date"
                                value={ExpensesDay}
                                className="pr-2 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 outline-none text-sm font-sans"
                                onChange={(e) => setExpensesDay(e.target.value)}
                            />
                        </div>
                    </div>


                </div>
            </div>
            {/* Table Container */}
            <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-zinc-100 shadow-2xl shadow-zinc-200/30 overflow-hidden">
                <table className="w-full text-right border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-100 bg-white">
                            <th className="p-6 font-bold text-zinc-400 text-xs uppercase tracking-widest"> الاسم</th>
                            <th className="p-6 font-bold text-zinc-400 text-xs uppercase tracking-widest">النوع</th>

                            <th className="p-6 font-bold text-zinc-400 text-xs uppercase tracking-widest">الملاحظات</th>
                            <th className="p-6 font-bold text-zinc-400 text-xs uppercase tracking-widest text-center">المبلغ</th>
                            <th className="p-6 font-bold text-zinc-400 text-xs uppercase tracking-widest text-center">التاريخ</th>
                            <th className="p-6 font-bold text-zinc-400 text-xs uppercase tracking-widest text-left">الإجراءات</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-50">
                        {expesnse?.map((e) => (
                            <tr key={e.documentId} className="hover:bg-zinc-50/50 transition-all duration-300 group">
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <span className="font-bold text-zinc-800 text-sm">
                                            {e.Person}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <span className="font-bold text-zinc-800 text-sm">
                                            {e.type}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="text-zinc-500 text-sm font-medium">
                                        {e.notes || "---"}
                                    </span>
                                </td>
                                <td className="p-6 text-center">
                                    <span className="inline-block font-black text-zinc-900 text-base">
                                        {Number(e.price).toLocaleString()} <span className="text-[10px] text-zinc-400 mr-1">ج.م</span>
                                    </span>
                                </td>

                                <td className="py-5 px-6 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-bold text-gray-700">{new Date(e.createdAt).toLocaleDateString('ar-EG', {
                                            weekday: 'long', day: 'numeric',
                                            month: 'long',
                                        })}</span>
                                        <span className="text-[10px] text-gray-400 font-sans uppercase">{new Date(e.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </td>
                                <td className="p-6 text-left">
                                    <div className="flex items-center justify-end gap-2">
                                        {/* زر التعديل */}
                                        <button

                                            className="p-2 rounded-lg text-zinc-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                                            title="تعديل"
                                        >
                                            <Link to={`/update_expenses/${e.documentId}`} >
                                                <PencilLine size={18} />
                                            </Link>
                                        </button>

                                        {/* زر الحذف */}
                                        <button
                                            onClick={() => handleDelete(e.documentId)}
                                            className="p-2 rounded-lg text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                                            title="حذف"
                                        >
                                            <Trash2 size={18} />
                                        </button>


                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {expesnse?.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-50 mb-4">
                            <ReceiptText size={30} className="text-zinc-200" />
                        </div>
                        <p className="text-zinc-400 font-medium text-sm">سجل المصروفات فارغ حالياً</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExpensesPage;