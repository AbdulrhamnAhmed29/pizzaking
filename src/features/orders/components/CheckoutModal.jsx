import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", damping: 25, stiffness: 300 }
    },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
};

export const CheckoutModal = ({ isOpen, onClose, onConfirm, totalAmount, isLoading, setCart }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            customerName: "عميل نقدي",
            paymentStatus: "كاش",
            discount: 0,
        }
    });

    const discountValue = watch("discount", 0);
    
    const finalPrice = totalAmount - (Number(discountValue) || 0);

    const onSubmit = (data) => {
        const finalFData = {
            ...data,
            totalPrice: totalAmount,
            finalPrice: finalPrice,
            barcode: `INV-${Date.now().toString().slice(-6)}`
        };
        onConfirm(finalFData);
        reset();
    };

    const clearData = () => {
        setCart([]);
        localStorage.removeItem("cart");
        onClose();
    };



    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.form
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        onSubmit={handleSubmit(onSubmit)}
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-zinc-200"
                    >
                        {/* Header */}
                        <div className="bg-zinc-900 p-5 text-white flex justify-between items-center">
                            <span className="font-bold text-lg">إتمام عملية البيع</span>
                            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></div>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Customer Name */}
                            <div>
                                <label className="block text-sm mb-1.5 font-semibold text-zinc-700">اسم العميل</label>
                                <input
                                    {...register("customerName", { required: "اسم العميل مطلوب" })}
                                    autoFocus
                                    className="w-full border border-zinc-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
                                />
                                {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
                            </div>

                            <div className="flex gap-4">
                                {/* Discount */}
                                <div className="flex-1">
                                    <label className="block text-sm mb-1.5 font-semibold text-zinc-700">الخصم (ج.م)</label>
                                    <input
                                        type="number"
                                        {...register("discount", { valueAsNumber: true, min: 0 })}
                                        className="w-full border border-zinc-300 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
                                    />
                                </div>

                                {/* Payment Status */}
                                <div className="flex-1">
                                    <label className="block text-sm mb-1.5 font-semibold text-zinc-700">طريقة الدفع</label>
                                    <select
                                        {...register("paymentStatus")}
                                        className="w-full border border-zinc-300 p-2.5 rounded-xl outline-none bg-white focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all appearance-none"
                                    >
                                        <option value="كاش">كاش</option>
                                        <option value="آجل">آجل</option>
                                    </select>
                                </div>
                            </div>

                            {/* Financial Summary */}
                            <motion.div
                                layout
                                className="bg-zinc-50 p-5 rounded-2xl border border-zinc-100 space-y-3"
                            >
                                <div className="flex justify-between text-zinc-500 text-sm">
                                    <span>الإجمالي الأساسي</span>
                                    <span>{totalAmount.toLocaleString()} ج.م</span>
                                </div>
                                <div className="flex justify-between text-red-500 text-sm">
                                    <span>قيمة الخصم</span>
                                    <span>- {(Number(discountValue) || 0).toLocaleString()} ج.م</span>
                                </div>
                                <div className="h-[1px] bg-zinc-200 my-2"></div>
                                <div className="flex justify-between font-black text-xl text-zinc-900">
                                    <span>الصافي</span>
                                    <motion.span
                                        key={finalPrice}
                                        initial={{ scale: 1.1, color: "#D4AF37" }}
                                        animate={{ scale: 1, color: "#000" }}
                                        className="inline-block"
                                    >
                                        {finalPrice.toLocaleString()} ج.م
                                    </motion.span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Actions */}
                        <div className="p-5 bg-zinc-50/50 flex gap-3 border-t border-zinc-100">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                onClick={clearData}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className="flex-[2] bg-zinc-900 text-white py-3.5 rounded-xl font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50 shadow-lg shadow-zinc-900/20"
                            >
                                {isLoading ? "جاري الحفظ..." : "تأكيد وإتمام العملية"}
                            </motion.button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-white border border-zinc-200 text-zinc-600 py-3.5 rounded-xl font-medium hover:bg-zinc-50 transition-all"
                            >
                                تراجع
                            </button>
                        </div>
                    </motion.form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};