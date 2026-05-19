import React, { useEffect, useMemo } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';

function UpdateForm({ attributeSet, attributes, allProducts, brands, update, categories }) {
    const Products = allProducts || [];
    const Brands = brands || [];
    const Categories = categories || [];
    const Attributes = attributes || [];
    const attribute_set = attributeSet || [];
    // 1- get documntId from use url  
    // ________________________________
    const { id: targetId } = useParams();
    // 2- filtration all products to get currant product 
    // __________________________________________________
    const currantProduct = useMemo(() => {
        return Products.find((currant) => currant.documentId === targetId);
    }, [Products, targetId]);
    // 3- Children from currantProduct(parent_Product) 
    const children = useMemo(() => {
        return Products.filter((e) => e.parent_id === targetId);
    }, [Products, targetId]);
    //3- intilaization react hook form 
    // __________________________________

    const clearData = () => {

        localStorage.removeItem("cart");

    };

    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            name: '',
            category_id: '',
            brand_id: '',
            bulk_quantity: 0,
            variants: []
        }
    });
    const { fields, append, } = useFieldArray({
        control,
        name: "variants"
    });
    const isInitialized = React.useRef(false);
    useEffect(() => {
        if (currantProduct && Products.length > 0 && !isInitialized.current) {
            console.log(currantProduct);
            reset({
                name: currantProduct.name,
                category_id: currantProduct.category?.documentId,
                brand_id: currantProduct.brand?.documentId,
                bulk_quantity: currantProduct.bulk_quantity || 0,
                variants: children.map((product) => ({
                    documentId: product.documentId,
                    attribute_id: product.attributes?.[0]?.documentId || '',
                    buying_price: product.buying_price || 0,
                    cost_price: product.cost_price || 0,
                    quantity: product.quantity || 0,
                    barcode: product.barcode || '',
                    attributeSet: product.attribute_sets?.[0]?.documentId || ''
                }))
            });
            isInitialized.current = true;
        }
    }, [currantProduct, Products, reset]);
    // 4- send data to server 
    // __________________________________
    const onsubmit = (data) => {
        clearData()
        const sendData = update({
            id: targetId,
            payload: data
        });;
        return sendData
    }
    return (
        <form onSubmit={handleSubmit(onsubmit)} className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-8" dir="rtl">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">تعديل المنتج</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-stone-800 mr-1">اسم المنتج</label>
                    <input
                        {...register("name", { required: true })}
                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-stone-800 mr-1">القسم</label>
                    <select {...register("category_id", { required: true })} className="w-full border border-gray-300 p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900">
                        <option value="">اختر القسم</option>
                        {Categories.map(c => <option key={c.id} value={c.documentId}>{c.name}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-stone-800 mr-1">البراند</label>
                    <select {...register("brand_id", { required: true })} className="w-full border border-gray-300 p-2.5 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900">
                        <option value="">اختر البراند</option>
                        {Brands.map(b => <option key={b.id} value={b.documentId}>{b.name}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-stone-800 mr-1">كمية السايب</label>
                    <input
                        type="number"
                        step="any"
                        {...register("bulk_quantity",)}
                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-t-xl border-b">
                    <h3 className="font-bold text-stone-800">المتغيرات</h3>
                    <button
                        type="button"
                        onClick={() => append({ documentId: "", attribute_id: '', cost_price: '', quantity: '0', barcode: '', attributeSet: '', })}
                        className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-600 hover:text-white transition-all"
                    >
                        + إضافة متغير
                    </button>
                </div>

                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <input type="hidden"
                                {...register(`variants.${index}.documentId`)}
                                defaultValue={field.documentId}
                            />

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-stone-900">النوع</label>
                                <select {...register(`variants.${index}.attributeSet`, { required: true })} className="border border-gray-300 p-2 rounded-md text-sm outline-none">
                                    <option value="">النوع</option>
                                    {attribute_set.map(a => <option key={a.id} value={a.documentId}>{a.name}</option>)}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-stone-900">الحجم</label>
                                <select {...register(`variants.${index}.attribute_id`, { required: true })} className="border border-gray-300 p-2 rounded-md text-sm outline-none">
                                    <option value="">الحجم</option>
                                    {Attributes.map(a => <option key={a.id} value={a.documentId}>{a.name}</option>)}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-stone-900 mr-1">سعر الشراء</label>
                                <input
                                    type="number"
                                    {...register(`variants.${index}.buying_price`,)}
                                    placeholder="0.00"
                                    className={`border p-2 rounded-md text-sm outline-none`}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-stone-900">سعر التكلفة</label>
                                <input
                                    type="number"
                                    {...register(`variants.${index}.cost_price`, { valueAsNumber: true, required: true })}
                                    className="border border-gray-300 p-2 rounded-md text-sm outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-stone-900">الكمية</label>
                                <input
                                    type="number"
                                    {...register(`variants.${index}.quantity`, { valueAsNumber: true, required: true })}
                                    className="border border-gray-300 p-2 rounded-md text-sm outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-stone-900">الباركود</label>
                                <input type="text" {...register(`variants.${index}.barcode`)} className="border border-gray-300 p-2 rounded-md text-sm outline-none" />
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t flex justify-first">
                <button type="submit" className="bg-stone-900 text-white px-10 py-3 rounded-xl font-bold text-lg hover:bg-stone-700 transition-all">
                    تحديث المنتج
                </button>
            </div>
        </form>
    )
}

export default UpdateForm;