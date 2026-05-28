import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProducts } from '../hooks/UseGetProducts';
import { useCategory } from '../../categories/hooks/useCategory';
import { useGetBrands } from '../../brands/hooks/useGetBrands';
import { useGetAttributeSet } from '../../attributesSet/hooks/useGetAttributes';
import { useGetAttribute } from '../../attributes/hooks/useGetAttribute';
import UpdateForm from '../components/updateForm';
import { useMutationProduct } from '../hooks/UseMutationProduct'
import { ArrowRight } from 'lucide-react';

function UpdateProduct() {
    const { id } = useParams();
    const { data, isLoading } = useGetProducts();
    const currentProduct = data.data?.find(p => p.documentId === id);
    const { categories } = useCategory();
    const { brands } = useGetBrands();
    const { attributeSet } = useGetAttributeSet();
    const { attributes } = useGetAttribute();
    const { update } = useMutationProduct();
    const navigate = useNavigate();

    if (isLoading) return <div className="flex justify-center items-center h-screen font-bold">جاري تحميل البيانات...</div>

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8" dir="rtl">
            {/* Header Section */}
            <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => navigate('/products')}>المنتجات</span>
                        <span>/</span>
                        <span className="text-gray-800 font-medium">تعديل منتج</span>
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                        تعديل: <span className="text-[#D4AF37]">{currentProduct?.name || "..."}</span>
                    </h1>
                </div>

                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 font-semibold text-sm"
                >
                    <ArrowRight size={18} />
                    رجوع للخلف
                </button>
            </div>

            {/* Form Section */}
            <div className="relative">
               
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-full transform translate-y-20"></div>
                
                <UpdateForm
                    categories={categories}
                    brands={brands}
                    attributes={attributes}
                    attributeSet={attributeSet}
                    allProducts={data}
                    update={update}
                />
            </div>
        </div>
    )
}

export default UpdateProduct