import React from 'react'
import ProductForm from '../components/ProductForm'
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCategory } from '../../categories/hooks/useCategory';
import { useGetBrands } from '../../brands/hooks/useGetBrands';
import { useGetAttributeSet } from '../../attributesSet/hooks/useGetAttributes';
import { useGetAttribute } from '../../attributes/hooks/useGetAttribute';
import { useMutationProduct } from '../../products/hooks/UseMutationProduct';




function AddProducts() {

    const navigate = useNavigate();
    const { categories } = useCategory();
    const { brands } = useGetBrands();
    const { attributeSet } = useGetAttributeSet();
    const { attributes } = useGetAttribute();
    const { mutate } = useMutationProduct();
    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-3 bg-white hover:bg-zinc-100 rounded-2xl shadow-sm transition-all text-zinc-400 hover:text-zinc-900"
                        >
                            <ArrowRight size={24} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">إضافة منتج جديد</h1>
                            <p className="text-zinc-500 font-medium">قم بتعبئة التفاصيل الأساسية والأحجام المتوفرة للمخزن</p>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <ProductForm
                    product={[]}
                    categories={categories}
                    brands={brands}
                    Mutate={mutate}
                    attributeSet={attributeSet}
                    attribute={attributes}
                    // path="/products"
                />
            </div>
        </div>
    )
}

export default AddProducts