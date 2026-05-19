import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';

const ChildProductView = ({
  selectedParent,
  setSelectedParent,
  childProducts,
  availableAttributes,
  selectedAttribute,
  setSelectedAttribute,
  addToCart
}) => {




  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 bg-none duration-300">
      <div className="flex items-center justify-between mb-6 bg-zinc-900 p-5 rounded-3xl text-white">
        <div className="flex items-center gap-5 p-2">
          <button
            onClick={() => { setSelectedParent(null); setSelectedAttribute('الكل'); }}
            className="group p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all"
          >
            <ArrowRight size={22} className="text-zinc-300 group-hover:text-white" />
          </button>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">{selectedParent.name} <span className={`${selectedParent.bulk_quantity ? "" : "hidden"}`}>({selectedParent.bulk_quantity})</span></h2>
            <p className="text-zinc-500 text-xs font-medium">اختر النوع أو المقاس</p>
            <p className="text-zinc-500 text-xs font-medium">  </p>

          </div>
        </div>
        <div className="flex gap-2 bg-white/5 p-2 rounded-2xl">
          {availableAttributes.map(attr => (
            <button
              key={attr}
              onClick={() => setSelectedAttribute(attr)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedAttribute === attr ? 'bg-[#D4AF37] text-zinc-900' : 'hover:bg-white/10 text-white'
                }`}
            >
              {attr}
            </button>
          ))}
        </div>
      </div>
      {/* child grid*/}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {childProducts.map(child => (
          <div
            key={child.id}
            onClick={() => addToCart(child)}
            className={` ${child.quantity <= 0 && child.barcode === true ? "hidden" : ""} group relative p-5  rounded-[1.8rem] border border-zinc-100 shadow-custom hover:shadow-2xl hover:border-[#D4AF37]/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden`}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="bg-zinc-100 text-zinc-500 px-3 py-1 rounded-full text-[10px] font-bold">
                {child.attribute_sets?.[0]?.name || 'افتراضي'}

              </span>
              <div className="bg-[#D4AF37] text-white p-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-[#D4AF37]/30">
                <Plus size={18} strokeWidth={3} />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-zinc-800 text-sm">{child?.name}</h3>

                <span className={`inline-block mt-1 text-[11px] font-medium text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded-md border border-zinc-100 ${child.attribute_sets?.[0]?.name === "فلاتر هواء" ? "hidden" : ""}`}>
                  {child.attributes?.[0]?.name}
                </span>
              </div>


              <div className="pt-3 flex gap-12 items-baseline  border-t border-zinc-50">
                <div>
                  <span className="text-2xl font-black text-zinc-900 tracking-tight">
                    {child.cost_price}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-400">ج.م</span>
                </div>

                <span className={`text-[15px] font-black text-zinc-900 tracking-tight ${child.attribute_sets?.[0]?.name === "سايب" ? "hidden" : ""} ${child.attribute_sets?.[0]?.name === "خدمات" ? "hidden" : ""}`}>
                  ({child.quantity})  </span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildProductView;