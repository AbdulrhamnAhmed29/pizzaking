import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar = ({ cart, setCart, cartTotal, isOpen, onClose, onOpen }) => {

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    }

    // Variants
    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20, scale: 0.95 }
    };

    const numberVariants = {
        initial: { y: 15, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -15, opacity: 0 }
    };

    return (
        <div className="w-[380px] h-[650px] pb-2 bg-white border-r border-zinc-100 shadow-2xl flex flex-col overflow-hidden">
            {/* Header Section */}
            <div className="p-5 bg-zinc-900 text-white rounded-bl-[3rem] shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-black flex items-center gap-2">
                        <ShoppingCart size={24} className="text-[#D4AF37]" />
                    </h2>
                    <motion.span
                        key={cart.length}
                        initial={{ scale: 1.5, backgroundColor: "#fff" }}
                        animate={{ scale: 1, backgroundColor: "#D4AF37" }}
                        className="text-zinc-900 px-2.5 py-1 rounded-full text-xs font-black"
                    >
                        {cart.length}
                    </motion.span>
                </div>
                <div className="space-y-1">
                    <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">الإجمالي النهائي</p>
                    <div className="h-14 overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={cartTotal}
                                variants={numberVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="text-5xl font-black text-[#D4AF37] flex items-baseline gap-2"
                            >
                                {cartTotal.toFixed(2)}
                                <span className="text-sm text-zinc-500 font-medium">ج.م</span>
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Cart Items Section */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {cart.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col items-center justify-center text-zinc-500"
                        >
                            <ShoppingCart size={60} strokeWidth={1} className="opacity-20" />
                            <p className="mt-4 font-bold opacity-40">لا توجد أصناف في السلة</p>
                        </motion.div>
                    ) : (
                        cart.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-zinc-100 hover:shadow-md transition-shadow group"
                            >
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-zinc-900 truncate">{item.name}</h4>
                                    <p className={`font-black text-[10px] text-zinc-400 ${item.attributes?.[0]?.name === "خدمة" ? "hidden" : ""}`}>
                                        {item.attribute_sets?.[0]?.name} <span className="text-[#D4AF37]">{item.attributes?.[0]?.name}</span>
                                    </p>
                                    <p className="text-sm font-black text-zinc-900 mt-1">
                                        {(item.cost_price * item.quantity).toFixed(2)} <span className="text-[10px] text-zinc-400">ج.م</span>
                                    </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-1 bg-zinc-50 rounded-xl p-1 border border-zinc-100">
                                    <motion.button
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-zinc-500 shadow-sm hover:text-red-500 transition-colors"
                                    >
                                        <Minus size={12} />
                                    </motion.button>

                                    <div className="w-8 h-7 relative overflow-hidden flex items-center justify-center">
                                        <AnimatePresence mode="popLayout">
                                            <motion.span
                                                key={item.quantity}
                                                variants={numberVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                className="text-xs font-black absolute"
                                            >
                                                {item.quantity}
                                            </motion.span>
                                        </AnimatePresence>
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.8 }}
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="w-7 h-7 flex items-center justify-center bg-zinc-900 rounded-lg text-white shadow-sm hover:bg-zinc-700 transition-colors"
                                    >
                                        <Plus size={12} />
                                    </motion.button>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.1, color: "#ef4444" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => removeItem(item.id)}
                                    className="p-1.5 text-zinc-300 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </motion.button>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-zinc-100 bg-white space-y-3">
                <AnimatePresence>
                    {cart.length > 0 && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onOpen}
                            className="w-full bg-[#D4AF37] text-zinc-900 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                        >
                            <CheckCircle size={20} /> إتمام ودفع الفاتورة
                        </motion.button>
                    )}
                </AnimatePresence>

                <div>
                    <motion.button
                        whileHover={{ backgroundColor: "#f4f4f5" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={clearCart}
                        className="w-full bg-zinc-100 text-zinc-600 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                        إلغاء العملية
                    </motion.button>
                    

                </div>
            </div>
        </div>
    );
};

export default CartSidebar;