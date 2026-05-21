import { useMemo } from "react";
import { ProductRow } from "./ProductRow";
export const ProductsTable = ({ products, isLoading, onEdit, onDelete, onAdd, setSearchTerm, searchTerm, productsMeta,  }) => {
  // netproft 
  const netproft = useMemo(() => {
    if (!products || products.length === 0) return 0;
    const buyPrice = Number(products[2]?.buying_price || 0);
    const costPrice = Number(products[8]?.cost_price || 0);
    return costPrice - buyPrice;
  }, [products]);
  console.log(netproft);
  const sortedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    const parents = products?.filter(p => !p.parent_id);
    const finalList = [];
    parents.forEach(parent => {
      finalList.push({ ...parent, isParent: true });
      const children = products?.filter(child => {
        if (!child.parent_id) return false;
        const childParentRef = child.parent_id?.documentId || child.parent_id;
        const parentDocId = parent.documentId;
        return String(childParentRef) === String(parentDocId);
      });
      if (children.length > 0) {
        finalList.push(...children.map(c => ({ ...c, isChild: true })));
      }
    });
    return finalList;
  }, [products]);
  return (
    <div className="w-full space-y-6 ">
      {/* search button  */}
      <div className="relative max-w-md w-full group">
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          placeholder="ابحث عن منتجك ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          dir="rtl"
          className="block w-full pr-11 pl-4 py-3.5 bg-white border border-gray-200 
               text-gray-900 text-sm rounded-2xl shadow-sm
               placeholder:text-gray-400
               focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
               hover:border-gray-300 transition-all duration-200"
        />
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-zinc-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-100 text-right text-xs font-black text-zinc-400 uppercase">
                <th className="px-6 py-4">المنتج</th>
                <th className="px-6 py-4">نوعه</th>
                <th className="px-6 py-4">سعر البيع</th>
                <th className="px-6 py-4">سعر الشراء</th>
                <th className="px-6 py-4">الربح</th>
                <th className="px-6 py-4 text-center">مخزون</th>
                <th className="px-6 py-4 text-center">الباركود</th>
                <th className="px-4 py-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {sortedProducts.map(product => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onDelete={onDelete}
                  buying_price={product.buying_price}
                  cost_price={product.cost_price}
                />
              ))}
            </tbody>
          </table>
        </div>

      </div>
  
    </div>
  );
};