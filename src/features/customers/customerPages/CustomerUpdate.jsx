import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCustomer } from '../hooks/useCustomerMutation';
import { ArrowRight, CreditCard, DollarSign, Send, CheckCircle2, AlertCircle } from 'lucide-react';

function CustomerUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { customerById, createPayment } = useCustomer(id);

    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    // إعداد React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            payed_amount: ''
        }
    });

    if (!customerById) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const onSubmit = async (data) => {
        setStatusMessage({ type: '', text: '' });
        try {
            await createPayment({
                data: {
                    payed_amount: Number(data.payed_amount),
                    customer: id
                }
            });

            setStatusMessage({ type: 'success', text: 'تم تسجيل الدفعة بنجاح!' });

            setTimeout(() => {
                navigate(`/customerDetails/${id}`);
            }, 1200);

        } catch (error) {
            console.error(error);
            setStatusMessage({ type: 'error', text: 'حدث خطأ أثناء تسجيل الدفعة، حاول مرة أخرى' });
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <Link
                    to={`/customerDetails/${id}`}
                    className="p-3 bg-gray-50 hover:bg-amber-50 hover:text-[#D4AF37] text-zinc-600 rounded-2xl transition-all"
                    title="رجوع"
                >
                    <ArrowRight size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
                        <CreditCard className="text-[#D4AF37]" size={28} />
                        تسجيل دفعة <span className="text-[#D4AF37]">جديدة</span>
                    </h1>
                    <p className="text-zinc-500 font-bold text-xs mt-1">
                        إضافة تحصيل مالي للعميل: <span className="text-zinc-900">{customerById.name}</span>
                    </p>
                </div>
            </div>

            {/* Status Alert */}
            {statusMessage.text && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${
                    statusMessage.type === 'success' 
                        ? 'bg-green-50 text-green-700 border border-green-100' 
                        : 'bg-red-50 text-red-700 border border-red-100'
                }`}>
                    {statusMessage.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    {statusMessage.text}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                {/* Customer Info Card */}
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
                            {customerById.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400">اسم العميل</p>
                            <p className="text-sm font-black text-zinc-800">{customerById.name}</p>
                        </div>
                    </div>
                    <span className="text-xs font-bold bg-amber-50 text-[#D4AF37] px-3 py-1 rounded-full border border-amber-100">
                        {customerById.phone || 'بدون رقم'}
                    </span>
                </div>

                {/* Amount Input with React Hook Form Registration */}
                <div className="space-y-2">
                    <label className="block text-xs font-black text-zinc-700 mr-1">
                        المبلغ المدفوع
                    </label>
                    <div className="relative flex items-center">
                        <input
                            type="number"
                            step="any"
                            placeholder="0.00"
                            {...register('payed_amount', {
                                required: 'برجاء إدخال المبلغ المدفوع',
                                min: {
                                    value: 1,
                                    message: 'يجب أن يكون المبلغ أكبر من 0'
                                }
                            })}
                            className={`w-full bg-gray-50 border ${
                                errors.payed_amount ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                            } focus:bg-white rounded-2xl px-5 py-4 text-zinc-900 font-black text-lg outline-none transition-all pl-12`}
                        />
                        <div className="absolute left-4 text-gray-400 font-bold text-sm flex items-center gap-1">
                            <DollarSign size={16} />
                            ج.م
                        </div>
                    </div>
                    
                    {/* Inline Error Message */}
                    {errors.payed_amount && (
                        <p className="text-red-500 font-bold text-xs mt-1 mr-1">
                            {errors.payed_amount.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-zinc-900 text-white hover:bg-[#D4AF37] hover:text-zinc-900 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <Send size={18} />
                            حفظ وتأكيد الدفعة
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default CustomerUpdate;