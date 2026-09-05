import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCustomer } from '../hooks/useCustomerMutation';
import { ArrowRight, CreditCard, Calendar, CheckCircle2, DollarSign, Wallet } from 'lucide-react';

function CustomerDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { customerById } = useCustomer(id);

    if (!customerById) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // حساب إجمالي الأوردرات والمدفوعات والمتبقي
    const totalPrice = customerById.orders?.reduce(
        (total, order) => total + Number(order.final_price || 0),
        0
    ) || 0;
    console.log("Total Price:", totalPrice);

    const totalPaid = customerById.payments?.reduce(
        (total, payment) => total + Number(payment.payed_amount || 0),
        0
    ) || 0;

    const remaining = totalPrice - totalPaid;

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-4">
                    <Link
                        onClick={() => navigate(-1)}
        
                        className="p-3 bg-gray-50 hover:bg-amber-50 hover:text-[#D4AF37] text-zinc-600 rounded-2xl transition-all"
                        title="رجوع"
                    >
                        <ArrowRight size={20} />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-lg">
                            {customerById.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
                                {customerById.name}
                            </h1>
                            <p className="text-zinc-500 font-bold text-xs">
                                رقم الهاتف: <span className="text-zinc-800">{customerById.phone || 'غير محدد'}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-zinc-400 mb-1">إجمالي الحساب</p>
                        <h3 className="text-xl font-black text-zinc-900">
                            {totalPrice.toLocaleString()} <small className="text-xs">ج.م</small>
                        </h3>
                    </div>
                    <div className="p-3 bg-zinc-900 text-white rounded-xl">
                        <DollarSign size={20} />
                    </div>
                </div>

                <div className="p-5 bg-green-50/50 rounded-2xl border border-green-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-green-600 mb-1">إجمالي المدفوع</p>
                        <h3 className="text-xl font-black text-green-700">
                            {totalPaid.toLocaleString()} <small className="text-xs">ج.م</small>
                        </h3>
                    </div>
                    <div className="p-3 bg-green-600 text-white rounded-xl">
                        <CheckCircle2 size={20} />
                    </div>
                </div>

                <div className={`p-5 rounded-2xl border flex items-center justify-between ${remaining > 0 ? "bg-red-50/50 border-red-100 text-red-700" : "bg-zinc-50 border-zinc-100 text-zinc-700"}`}>
                    <div>
                        <p className="text-xs font-bold opacity-80 mb-1">المتبقي علي العميل</p>
                        <h3 className="text-xl font-black">
                            {remaining.toLocaleString()} <small className="text-xs">ج.م</small>
                        </h3>
                    </div>
                    <div className={`p-3 rounded-xl text-white ${remaining > 0 ? "bg-red-600" : "bg-zinc-800"}`}>
                        <Wallet size={20} />
                    </div>
                </div>
            </div>

            {/* Payments Table Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <CreditCard className="text-[#D4AF37]" size={24} />
                    <h2 className="text-lg font-black text-zinc-900">سجل المدفوعات</h2>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-gray-100">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-black text-gray-400">#</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 text-center">المبلغ المدفوع</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 text-center">تاريخ الدفعة</th>
                                <th className="px-6 py-4 text-xs font-black text-gray-400 text-center">التوقيت</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                            {customerById.payments && customerById.payments.length > 0 ? (
                                customerById.payments.map((payment, index) => {
                                    const paymentDate = new Date(payment.createdAt);
                                    return (
                                        <tr key={payment.documentId || payment.id} className="hover:bg-amber-50/20 transition-colors">
                                            <td className="py-4 px-6 font-bold text-xs text-zinc-400">
                                                {index + 1}
                                            </td>

                                            <td className="py-4 px-6 text-center">
                                                <span className="text-sm font-black text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                                                    + {Number(payment.payed_amount || 0).toLocaleString()}
                                                    <small className="text-[10px] mr-1">ج.م</small>
                                                </span>
                                            </td>

                                            <td className="py-4 px-6 text-center">
                                                <span className="text-xs font-bold text-zinc-700 inline-flex items-center gap-1.5">
                                                    <Calendar size={14} className="text-gray-400" />
                                                    {paymentDate.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6 text-center text-xs font-bold text-gray-400">
                                                {paymentDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-zinc-400 font-bold text-sm">
                                        لا توجد مدفوعات مسجلة لهذا العميل حتى الآن.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CustomerDetails;