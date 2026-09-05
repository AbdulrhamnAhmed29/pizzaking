import React from "react";
import { Boxes, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetBrands } from "../hooks/useGetBrands";
import { useMutationBrands } from "../hooks/useMutationBrands";

function TableBrands() {
  const { brands  } = useGetBrands();
  const { deleteMutation } = useMutationBrands();


  console.log(brands);

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
            <Boxes className="text-[#D4AF37]" size={32} />
            ادارة{" "}
            <span className="text-[#D4AF37] font-outline-2">
              (البراندات)
            </span>
          </h1>

          <p className="text-zinc-500 font-bold text-sm mr-11 opacity-80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>

            إدارة ومتابعة العلامات التجارية داخل النظام
          </p>
        </div>

        {/* Add Button */}
        <Link
          to="/brandAdd"
          className="bg-zinc-900 w-44 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-[#D4AF37] hover:text-zinc-900 transition-all flex items-center gap-3 mx-auto shadow-2xl hover:scale-105 active:scale-95"
        >
          <Plus size={20} />
          اضافة براند
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-5 text-xs font-black text-gray-400">
                البراند
              </th>

              <th className="px-6 py-5 text-xs font-black text-gray-400 text-center">
                عدد المنتجات
              </th>

              <th className="px-6 py-5 text-xs font-black text-gray-400 text-center">
                الإجراءات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {brands?.map((brand) => {
              const productsCount = brand.products?.length || 0;

              return (
                <tr
                  key={brand.documentId}
                  className="hover:bg-amber-50/20 transition-colors group"
                >
                  {/* Brand */}
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm shrink-0">
                        {brand.name?.charAt(0).toUpperCase()}
                      </div>

                      <span className="text-lg font-black text-gray-800">
                        {brand.name}
                      </span>
                    </div>
                  </td>

                  {/* Products Count */}
                  <td className="py-5 px-6 text-center">
                    <span className="text-sm font-black text-zinc-900 bg-zinc-50 px-3 py-1 rounded-md">
                      {productsCount.toLocaleString()}

                      <small className="text-[10px] mr-1">
                        منتج
                      </small>
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-5 px-6">
                    <div className="flex items-center justify-center gap-1">
                   
                      {/* Delete */}
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="حذف"
                        onClick={() => deleteMutation(brand.documentId)}
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
  );
}

export default TableBrands;