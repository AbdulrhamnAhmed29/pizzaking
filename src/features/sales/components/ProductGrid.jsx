import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-[2rem] border border-zinc-100 p-5 shadow-sm hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all cursor-pointer overflow-hidden"
    >
      {/* Background Decorative Element */}
      <motion.div
        className="absolute -right-4 -top-4 w-24 h-24 bg-zinc-50 rounded-full group-hover:bg-[#D4AF37]/10 transition-colors"
        whileHover={{ scale: 1.5 }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-5">
          {/* Icon Container */}
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="bg-zinc-900 text-[#D4AF37] p-3 rounded-2xl shadow-lg"
          >
            <Layers size={20} />
          </motion.div>

          <div className="text-left">
            <span className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-tighter">
              {product.category?.name || 'عام'}
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-black text-zinc-800 text-sm mb-1 line-clamp-2 h-10 group-hover:text-[#D4AF37] transition-colors duration-300">
          {product.name}
        </h3>

        <div className="flex justify-between items-center pt-4 border-t border-zinc-50">
          {/* <div className="flex flex-col">
            <span className={`text-[10px] text-zinc-400 font-bold ${product.bulk_quantity <= 0 ? "hidden" : ""}`}>كمية السايب</span>
            <span className="text-sm font-black text-zinc-900">
              {product.bulk_quantity > 0 ? product.bulk_quantity : ""}
            </span>
          </div> */}

          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: -5 }}
            className="bg-zinc-50 text-zinc-400 p-2.5 rounded-xl group-hover:bg-[#D4AF37] group-hover:text-zinc-900 transition-all"
          >
            <ArrowRight size={18} className="rotate-180" />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-[#D4AF37]"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProductCard;