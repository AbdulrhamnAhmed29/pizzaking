import { Boxes, Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import React from 'react'
import { useCustomer } from '../hooks/useCustomerMutation'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

function CustomerTable() {
    const { customers } = useCustomer()
    const { deleteCustomer } = useCustomer();

 const handleDelete = async (customerId) => {

    const passwordResult = await Swal.fire({
        title: "صلاحية الحذف",
        text: "أدخل كلمة المرور لحذف حساب العميل",
        input: "password",
        inputPlaceholder: "كلمة المرور",
        inputAttributes: {
            maxlength: 4,
            autocapitalize: "off",
            autocorrect: "off",
        },
        showCancelButton: true,
        confirmButtonText: "متابعة",
        cancelButtonText: "إلغاء",
        reverseButtons: true,
        confirmButtonColor: "#D4AF37",
        cancelButtonColor: "#52525b",

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

    // لو الباسورد غلط أو المستخدم ضغط إلغاء
    if (!passwordResult.isConfirmed) return;


    // ⚠️ تأكيد حذف العميل
    const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "لو ضغطت نعم، سيتم حذف حساب العميل نهائيًا.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم، احذف العميل",
        cancelButtonText: "إلغاء",
        reverseButtons: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#52525b",
    });

    if (!result.isConfirmed) return;


    deleteCustomer(customerId);


    await Swal.fire({
        title: "تم الحذف",
        text: "تم حذف حساب العميل بنجاح.",
        icon: "success",
        confirmButtonText: "حسنًا",
        confirmButtonColor: "#D4AF37",
    });
};
    return (
        <div>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
                        <Boxes className="text-[#D4AF37]" size={32} />
                        ادارة <span className="text-[#D4AF37] font-outline-2">(المديونيات)</span>
                    </h1>
                    <p className="text-zinc-500 font-bold text-sm mr-11 opacity-80 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                        رقابة ذكية على حركة المدبونات والمنصرف وتتبع المدفوعات
                    </p>
                </div>
                <button>
                    <Link
                        to={"/customerAdd"}
                        className="bg-zinc-900 w-44 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-[#D4AF37] hover:text-zinc-900 transition-all flex items-center gap-3 mx-auto shadow-2xl hover:scale-105 active:scale-95"
                    >
                        <Plus size={20} />
                        اضافة عميل 
                    </Link>
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-5 text-xs font-black text-gray-400">
                                العميل
                            </th>

                            <th className="px-6 py-5 text-xs font-black text-gray-400 text-center">
                                الرقم
                            </th>

                            <th className="px-6 py-5 text-xs font-black text-gray-400 text-center">
                                إجمالي الحساب
                            </th>

                            <th className="px-6 py-5 text-xs font-black text-gray-400 text-center">
                                المدفوع
                            </th>

                            <th className="px-6 py-5 text-xs font-black text-gray-400 text-center">
                                المتبقي
                            </th>

                            <th className="px-6 py-5 text-xs font-black text-gray-400 text-center">
                                الإجراءات
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-50">

                        {customers?.map((customer) => {

                            const totalPrice =
                                customer.orders?.reduce(
                                    (total, order) =>
                                        total + Number(order.final_price || 0),
                                    0
                                ) || 0;

                            const totalPaid =
                                customer.payments?.reduce(
                                    (total, payment) =>
                                        total + Number(payment.payed_amount || 0),
                                    0
                                ) || 0;

                            const remaining = totalPrice - totalPaid;

                            return (
                                <tr
                                    key={customer.documentId}
                                    className="hover:bg-amber-50/20 transition-colors group"
                                >

                                    {/* العميل */}
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-3">

                                            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm shrink-0">
                                                {customer.name?.charAt(0).toUpperCase()}
                                            </div>

                                            <span className="text-sm font-black text-gray-800">
                                                {customer.name}
                                            </span>

                                        </div>
                                    </td>

                                    {/* الهاتف */}
                                    <td className="py-5 px-6 text-center">
                                        <span className="text-sm font-black text-gray-800">
                                            {customer.phone}
                                        </span>
                                    </td>

                                    {/* إجمالي الحساب */}
                                    <td className="py-5 px-6 text-center">
                                        <span className="text-sm font-black text-zinc-900 bg-zinc-50 px-3 py-1 rounded-md">
                                            {totalPrice.toLocaleString()}
                                            <small className="text-[10px] mr-1">
                                                ج.م
                                            </small>
                                        </span>
                                    </td>

                                    {/* المدفوع */}
                                    <td className="py-5 px-6 text-center">
                                        <span className="text-sm font-black text-zinc-900 bg-zinc-50 px-3 py-1 rounded-md">
                                            {totalPaid.toLocaleString()}
                                            <small className="text-[10px] mr-1">
                                                ج.م
                                            </small>
                                        </span>
                                    </td>

                                    {/* المتبقي */}
                                    <td className="py-5 px-6 text-center">
                                        <span
                                            className={`text-sm font-black px-3 py-1 rounded-md ${remaining > 0
                                                ? "text-red-600 bg-red-50"
                                                : "text-green-600 bg-green-50"
                                                }`}
                                        >
                                            {remaining.toLocaleString()}
                                            <small className="text-[10px] mr-1">
                                                ج.م
                                            </small>
                                        </span>
                                    </td>

                                    {/* الإجراءات */}
                                    <td className="py-5 px-6">
                                        <div className="flex items-center justify-center gap-1">

                                            <button>
                                                <Link
                                                    to={`/customerDetails/${customer.documentId}`}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                    title="عرض"
                                                >
                                                    <Eye size={20} strokeWidth={2.5} />
                                                </Link>
                                            </button>


                                            <button

                                                className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                                                title="تعديل"
                                            >
                                                <Link
                                                    to={`/customerUpdate/${customer.documentId}`}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                    title="عرض"
                                                >
                                                    <Pencil size={18} />
                                                </Link>
                                            </button>

                                            <button
                                                onClick={() => handleDelete(customer.documentId)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                title="حذف"
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerTable
