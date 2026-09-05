import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutationBrands } from "../hooks/useMutationBrands";
import { useGetBrands } from "../hooks/useGetBrands";
import {
    ArrowRight,
    Tags,
    Tag,
    Send,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

function UpdateBrands() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { brandById, isLoading } = useGetBrands(id);
    const { updateMutation } = useMutationBrands();
    const Brand = brandById || []

    const [statusMessage, setStatusMessage] = useState({
        type: "",
        text: "",
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: "",
        },
    });

    // وضع بيانات البراند داخل الفورم
    useEffect(() => {
        if (Brand) {
            reset({
                name: Brand.name || "",
            });
        }
    }, [Brand, reset]);

    const onSubmit = (data) => {
        console.log(data)
        setStatusMessage({
            type: "",
            text: "",
        });
const payload = {
    data:{
        id:id,
        name:data?.name
    }
}
        try {
            updateMutation(payload);

            setStatusMessage({
                type: "success",
                text: "تم تعديل البراند بنجاح!",
            });

            setTimeout(() => {
                navigate("/brands");
            }, 1200);
        } catch (error) {
            console.error(error);

            setStatusMessage({
                type: "error",
                text: "حدث خطأ أثناء تعديل البراند، حاول مرة أخرى",
            });
        }
    };

    // Loading
    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // البراند غير موجود
    if (!Brand) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-red-50 text-red-700 border border-red-100 p-5 rounded-3xl font-bold text-sm flex items-center gap-3">
                    <AlertCircle size={20} />
                    البراند المطلوب غير موجود
                </div>

                <Link
                    to="/brands"
                    className="mt-5 inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-2xl font-black text-sm"
                >
                    <ArrowRight size={18} />
                    العودة للبراندات
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">

            {/* Header Section */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6">

                <Link
                    to="/brands"
                    className="p-3 bg-gray-50 hover:bg-amber-50 hover:text-[#D4AF37] text-zinc-600 rounded-2xl transition-all"
                    title="رجوع"
                >
                    <ArrowRight size={20} />
                </Link>

                <div>
                    <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
                        <Tags className="text-[#D4AF37]" size={28} />

                        تعديل براند{" "}
                        <span className="text-[#D4AF37]">موجود</span>
                    </h1>

                    <p className="text-zinc-500 font-bold text-xs mt-1">
                        تعديل بيانات البراند{" "}
                        <span className="text-zinc-900">
                            {Brand.name}
                        </span>
                    </p>
                </div>

            </div>

            {/* Status Alert */}
            {statusMessage.text && (
                <div
                    className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${statusMessage.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-100"
                        : "bg-red-50 text-red-700 border border-red-100"
                        }`}
                >
                    {statusMessage.type === "success" ? (
                        <CheckCircle2 size={20} />
                    ) : (
                        <AlertCircle size={20} />
                    )}

                    {statusMessage.text}
                </div>
            )}

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6"
            >

                {/* Brand Name */}
                <div className="space-y-2">

                    <label className="block text-xs font-black text-zinc-700 mr-1">
                        اسم البراند
                    </label>

                    <div className="relative flex items-center">

                        <input
                            type="text"
                            placeholder="مثال: Shell"
                            {...register("name", {
                                required: "برجاء إدخال اسم البراند",
                                minLength: {
                                    value: 2,
                                    message: "اسم البراند يجب أن لا يقل عن حرفين",
                                },
                                maxLength: {
                                    value: 100,
                                    message: "اسم البراند طويل جدًا",
                                },
                            })}
                            className={`w-full bg-gray-50 border ${errors.name
                                ? "border-red-500 focus:border-red-500"
                                : "border-gray-200 focus:border-[#D4AF37]"
                                } focus:bg-white rounded-2xl px-5 py-4 text-zinc-900 font-bold text-sm outline-none transition-all pr-12`}
                        />

                        <div className="absolute right-4 text-gray-400">
                            <Tag size={18} />
                        </div>

                    </div>

                    {errors.name && (
                        <p className="text-red-500 font-bold text-xs mt-1 mr-1">
                            {errors.name.message}
                        </p>
                    )}

                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-zinc-900 text-white hover:bg-[#D4AF37] hover:text-zinc-900 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <Send size={18} />
                            حفظ التعديلات
                        </>
                    )}
                </button>

            </form>
        </div>
    );
}

export default UpdateBrands;