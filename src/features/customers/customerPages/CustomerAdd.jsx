import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCustomer } from '../hooks/useCustomerMutation';
import { ArrowRight, UserPlus, User, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';

function CustomerAdd() {
    const navigate = useNavigate();
    const { addCustomer } = useCustomer();
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    // إعداد React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            name: '',
            phone: ''
        }
    });

    const onSubmit = async (data) => {
        setStatusMessage({ type: '', text: '' });

        try {
            // إرسال البيانات بنفس الهيكلة المتوقعة لـ Strapi
            await addCustomer({
                data: {
                    name: data.name,
                    phone: data.phone
                }
            });

            setStatusMessage({ type: 'success', text: 'تمت إضافة العميل بنجاح!' });

            // التوجيه لجدول العملاء بعد النجاح
            setTimeout(() => {
                navigate('/clients');
            }, 1200);

        } catch (error) {
            console.error(error);
            setStatusMessage({ type: 'error', text: 'حدث خطأ أثناء إضافة العميل، حاول مرة أخرى' });
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <Link
                    to="/customers"
                    className="p-3 bg-gray-50 hover:bg-amber-50 hover:text-[#D4AF37] text-zinc-600 rounded-2xl transition-all"
                    title="رجوع"
                >
                    <ArrowRight size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
                        <UserPlus className="text-[#D4AF37]" size={28} />
                        إضافة عميل <span className="text-[#D4AF37]">جديد</span>
                    </h1>
                    <p className="text-zinc-500 font-bold text-xs mt-1">
                        أدخل بيانات العميل للتمكن من متابعة حركته المالية
                    </p>
                </div>
            </div>

            {/* Status Alert */}
            {statusMessage.text && (
                <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${statusMessage.type === 'success'
                        ? 'bg-green-50 text-green-700 border border-green-100'
                        : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                    {statusMessage.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    {statusMessage.text}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">

                {/* Customer Name */}
                <div className="space-y-2">
                    <label className="block text-xs font-black text-zinc-700 mr-1">
                        اسم العميل
                    </label>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="مثال: عبد الرحيم"
                            {...register('name', {
                                required: 'برجاء إدخال اسم العميل',
                                minLength: {
                                    value: 3,
                                    message: 'اسم العميل يجب أن لا يقل عن 3 أحرف'
                                }
                            })}
                            className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                                } focus:bg-white rounded-2xl px-5 py-4 text-zinc-900 font-bold text-sm outline-none transition-all pr-12`}
                        />
                        <div className="absolute right-4 text-gray-400">
                            <User size={18} />
                        </div>
                    </div>
                    {errors.name && (
                        <p className="text-red-500 font-bold text-xs mt-1 mr-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                    <label className="block text-xs font-black text-zinc-700 mr-1">
                        رقم الهاتف
                    </label>
                    <div className="relative flex items-center">
                        <input
                            type="tel"
                            placeholder="مثال: 01128787885"
                            {...register('phone', {
                                required: 'برجاء إدخال رقم الهاتف',
                                pattern: {
                                    value: /^[0-9+]{10,15}$/,
                                    message: 'برجاء إدخال رقم هاتف صحيح'
                                }
                            })}
                            className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#D4AF37]'
                                } focus:bg-white rounded-2xl px-5 py-4 text-zinc-900 font-bold text-sm outline-none transition-all pr-12 text-left dir-ltr`}
                        />
                        <div className="absolute right-4 text-gray-400">
                            <Phone size={18} />
                        </div>
                    </div>
                    {errors.phone && (
                        <p className="text-red-500 font-bold text-xs mt-1 mr-1">
                            {errors.phone.message}
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
                            حفظ البيانات
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

export default CustomerAdd;