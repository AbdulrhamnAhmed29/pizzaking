import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useOrderMutation } from "../../orders/hooks/useMutationOrders";
import { useParams, useNavigate } from "react-router-dom";
import { useOrders } from "../hooks/useGetOrders";
import { ArrowRight, Save, User, CreditCard, Hash, PlusCircle, MinusCircle } from "lucide-react";
import Swal from 'sweetalert2';
import { ORDER_STATUS } from "../../../constants/orderStatus";

const UpdateOrderPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { update } = useOrderMutation();
    const { orderById, isLoading } = useOrders(id);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            customerName: "",
            paymentStatus: "",
            update_price: 0,
            priceAction: "plus",
            customerPhone: "",
            paid: 0,
        }
    });

    const watchedAmount = watch("update_price");
    const watchedAction = watch("priceAction");
    const watched = watch("paid");
    const watchStatus = watch("paymentStatus");
    console.log(watchStatus);





    useEffect(() => {
        if (orderById) {
            reset({
                customerName: orderById.customers?.name,
                customerPhone: orderById.customers?.phone,
                paymentStatus: orderById.status_order,
                update_price: 0,
                priceAction: orderById.update_price < 0 ? "minus" : "plus",
                paid_amount: orderById.paid_amount,
            });
        }
    }, [orderById, reset]);

    const isPartiallyPaid = watchStatus === ORDER_STATUS.PARTIALLY_PAID;


    const onSubmit = (data) => {
        const adjustment = data.priceAction === "minus"
            ? -Number(data.update_price)
            : Number(data.update_price);

        const newFinalPrice = Number(orderById.final_price || 0) + adjustment;

        const finalPaidAmount = watchStatus === ORDER_STATUS.CASH ? newFinalPrice : Number(data.paid || 0);

        if (finalPaidAmount > newFinalPrice) {
            Swal.fire({ icon: 'error', title: 'خطأ!', text: `المبلغ المدفوع (${finalPaidAmount}) لا يمكن أن يكون أكبر من الإجمالي (${newFinalPrice})`, confirmButtonColor: '#ef4444' });
            return;
        }
        if (newFinalPrice < 0 || finalPaidAmount < 0) {
            Swal.fire({ icon: 'error', title: 'خطأ!', text: 'لا يمكن أن تكون القيم أو المدفوعات بالسالب', confirmButtonColor: '#ef4444' });
            return;
        }
        const payload = {
            id: orderById.documentId,
            updatedData: {
                status_order: data.paymentStatus,
                update_price: adjustment,
                final_price: Number(orderById.final_price) + adjustment,
                paid_amount: watchStatus === ORDER_STATUS.CASH ? Number(orderById.final_price) + adjustment : data.paid,
            }
        };

        console.log(payload);
        update({ id, payload }, {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'تم التحديث!',
                    text: 'تم تعديل بيانات الفاتورة بنجاح',
                    confirmButtonText: 'حسناً',
                    confirmButtonColor: '#18181b',
                    timer: 2000
                }).then(() => { navigate('/sales'); });
            },
            onError: (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'عذراً...',
                    text: 'حدث خطأ أثناء التحديث، حاول مرة أخرى',
                    confirmButtonText: 'موافق',
                    confirmButtonColor: '#ef4444'
                });
                console.error(error);
            }
        });
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fcfcfc] p-4 md:p-8 font-arabic" dir="rtl">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors mb-2 group"
                        >
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            <span className="text-sm font-bold">العودة للقائمة</span>
                        </button>
                        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
                            تعديل تفاصيل <span className="text-amber-500">الطلب</span>
                        </h1>
                    </div>

                    <div className="bg-white px-4 py-2 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                            <Hash size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase">رقم المرجع</p>
                            <p className="text-sm font-black text-zinc-800 font-sans">{orderById?.barcode || id}</p>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl border border-zinc-100 shadow-xl shadow-zinc-200/40 overflow-hidden"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="divide-y divide-zinc-50">

                        {/* Section 1: Customer Details */}
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white">
                                    <User size={16} />
                                </div>
                                <h2 className="font-black text-zinc-800 text-lg">بيانات العميل</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mr-1">اسم العميل بالكامل</label>
                                    <input
                                        {...register("customerName", { required: "اسم العميل مطلوب" })}
                                        className={`w-full bg-zinc-50 border ${errors.customerName ? 'border-red-500' : 'border-zinc-400'} p-4 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all font-bold text-zinc-800`}
                                        placeholder="أدخل اسم العميل..."
                                    />
                                    {errors.customerName && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.customerName.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mr-1">رقم العميل </label>
                                    <input
                                        {...register("customerPhone",)}
                                        className={`w-full bg-zinc-50 border ${errors.customerPhone ? 'border-red-500' : 'border-zinc-400'} p-4 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all font-bold text-zinc-800`}
                                        placeholder="أدخل رقم العميل..."
                                    />
                                    {errors.customerPhone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.customerPhone.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Payment & Price Adjustment */}
                        <div className="p-8 space-y-6 bg-zinc-50/30">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white">
                                    <CreditCard size={16} />
                                </div>
                                <h2 className="font-black text-zinc-800 text-lg">تفاصيل الحساب</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/*  payment */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mr-1">طريقة السداد</label>
                                    <select
                                        {...register("paymentStatus", { required: "طريقة الدفع مطلوبة" })}
                                        className="w-full bg-white border border-zinc-400 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all font-bold text-zinc-800 appearance-none cursor-pointer"
                                    >
                                        <option value={ORDER_STATUS.CASH}>كاش</option>
                                        <option value={ORDER_STATUS.CREDIT}> آجل</option>
                                        <option value={ORDER_STATUS.PARTIALLY_PAID}> دفع جزئي</option>

                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mr-1">تعديل القيمة (فرق سعر / خصم)</label>
                                    <div className="flex gap-0">
                                        <select
                                            {...register("priceAction")}
                                            className="bg-zinc-100 border border-zinc-400 p-4 rounded-r-2xl outline-none focus:border-amber-500 font-bold text-zinc-700 cursor-pointer"
                                        >
                                            <option value="plus"> زيادة</option>
                                            <option value="minus">خصم</option>
                                        </select>
                                        <input
                                            type="number"
                                            {...register("update_price")}
                                            className="w-full bg-white border border-zinc-400 p-4 rounded-l-2xl outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all font-bold text-zinc-800 shadow-inner"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    {watchedAmount > 0 && (
                                        <div className={`flex items-center gap-1 mt-2 text-[11px] font-bold ${watchedAction === 'plus' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {watchedAction === 'plus' ? <PlusCircle size={12} /> : <MinusCircle size={12} />}
                                            {watchedAction === 'plus' ? 'سيتم إضافة القيمة لإجمالي الفاتورة' : 'سيتم خصم القيمة من إجمالي الفاتورة'}
                                        </div>
                                    )}
                                </div>
                                <div className={`grid grid-cols-1  gap-6 ${isPartiallyPaid ? "" : "hidden"}`}>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mr-1">المدفوعات</label>
                                        <input
                                            {...register("paid",)}
                                            className={`w-full bg-zinc-50 border ${errors.paid ? 'border-red-500' : 'border-zinc-400'} p-4 rounded-2xl outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all font-bold text-zinc-800`}
                                            placeholder="أدخل المبلغ المدفوع..."

                                        />
                                        {errors.paid && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.paid.message}</p>}
                                    </div>
                                </div>

                            </div>

                            {/* ملخص الحساب الصافي */}
                            <div className="bg-zinc-900 rounded-2xl p-6 mt-4 flex items-center justify-between text-white shadow-lg shadow-zinc-200">
                                <div>
                                    <p className="text-zinc-400 text-[10px] font-black uppercase mb-1">الإجمالي النهائي المتوقع</p>
                                    <p className="text-2xl font-black font-sans">
                                        {(
                                            Number(orderById?.final_price || 0) -
                                            Number(watched || 0) +
                                            (watchedAction === "minus" ? -Number(watchedAmount || 0) : Number(watchedAmount || 0))
                                        ).toLocaleString()}
                                        <span className="text-sm text-amber-500 mr-1">ج.م</span>                                </p>
                                </div>
                                <div className="text-left">
                                    <p className="text-zinc-400 text-[10px] font-black uppercase mb-1 text-right">الحالة الحالية</p>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black ${orderById?.status_order === 'كاش' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                        {orderById?.status_order}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-8 flex items-center justify-end gap-4 bg-white">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-8 py-4 rounded-2xl text-zinc-400 font-bold hover:bg-zinc-50 transition-all"
                            >
                                إلغاء
                            </button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="flex items-center gap-3 bg-zinc-900 text-amber-500 px-10 py-4 rounded-2xl font-black shadow-xl shadow-zinc-200 hover:bg-black transition-all"
                            >
                                <Save size={20} />
                                حفظ التغييرات
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default UpdateOrderPage;