import React from 'react';
import { useGetProducts } from '../hooks/UseGetProducts';
import { useMutationProduct } from '../hooks/UseMutationProduct';
import { ProductsTable } from '../components/ProductsTable';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Boxes } from 'lucide-react';
const ProductsPage = () => {
  const {
    data: products,
    isLoading,
    setSearchTerm,
    searchTerm,
    page,
    setPage
  }
    =
    useGetProducts();
  const { deleteMutation } = useMutationProduct();
  const productsList = products.data || [];
  const productsMeta = products.meta || [];
  const premiumSwal = Swal.mixin({
    customClass: {
      confirmButton: 'bg-[#D4AF37] text-black px-8 py-2 rounded-xl font-black mx-2 shadow-lg shadow-[#D4AF37]/20',
      cancelButton: 'bg-zinc-100 text-zinc-500 px-8 py-2 rounded-xl font-black mx-2',
      input: 'rounded-xl border-zinc-100 focus:ring-[#D4AF37] focus:border-[#D4AF37] font-bold text-right',
      popup: 'rounded-[2rem] border-none shadow-2xl',
    },
    buttonsStyling: false,
  });
  const handleDelete = (productId) => {
    premiumSwal.fire({
      title: 'هل أنت متأكد من الحذف؟',
      text: "سيتم إزالة هذا الصنف نهائياً من سجلات المخزون",
      icon: 'warning',
      iconColor: '#ef4444',
      showCancelButton: true,
      confirmButtonText: 'نعم، حذف الصنف',
      cancelButtonText: 'تراجع',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(productId);
      }
    });
  };

  return (
    <div className="min-h-screen w-full pt-7 font-sans px-4 lg:px-8" dir="rtl">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
            <Boxes className="text-[#D4AF37]" size={32} />
            ادارة <span className="text-[#D4AF37] font-outline-2">(المخزون)</span>
          </h1>
          <p className="text-zinc-500 font-bold text-sm mr-11 opacity-80 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            رقابة ذكية على حركة الوارد والمنصرف وتتبع الكميات
          </p>
        </div>
        <button>
          <Link
            to={"/add-products"}
            className="bg-zinc-900 w-44 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-[#D4AF37] hover:text-zinc-900 transition-all flex items-center gap-3 mx-auto shadow-2xl hover:scale-105 active:scale-95"
          >
            <Plus size={20} />
            إضافة  منتج
          </Link>
        </button>
      </div>
      {/* Table Section */}
      <div className="  overflow-hidden">
        <div className="overflow-x-auto w-full">
          <ProductsTable
            products={productsList}
            isLoading={isLoading}
            onDelete={handleDelete}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            setPage={setPage}
            page={page}
            productsMeta={productsMeta}
          />
        </div>
      </div>
      {/* Branding Footer */}
      <div className="py-10 flex flex-col items-center gap-2 opacity-40">
        <div className="flex items-center gap-2">
          <div className="h-[1px] w-12 bg-zinc-300"></div>
          <span className="text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">سِجل للزيوت</span>
          <div className="h-[1px] w-12 bg-zinc-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;