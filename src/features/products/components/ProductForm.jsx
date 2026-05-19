import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

export default function ProductForm({ categories, brands, Mutate, attributeSet, attribute }) {

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      category_id: '',
      brand_id: '',
      bulk_quantity: 0,
      variants: [{ attribute_id: '', buying_price: '', cost_price: '', quantity: '', barcode: '', attributeSet: '' }]
    }
  });

  const clearData = () => {
   
    localStorage.removeItem("cart");
  };


  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants"
  });

  const onSubmit = (data) => {
    clearData()
    return Mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-8" dir="rtl">



      {/* Parent product */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-stone-800 mr-1">اسم المنتج</label>
          <input
            {...register("name", { required: "اسم المنتج مطلوب" })}
            placeholder="اسم الصنف الأساسي"
            className={`w-full border p-2.5 rounded-lg focus:ring-2 outline-none transition-all ${errors.name ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-stone-800 mr-1">القسم</label>
          <select
            {...register("category_id", { required: true })}
            className={`w-full border p-2.5 rounded-lg bg-white outline-none ${errors.category_id ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">اختر القسم</option>
            {categories?.map(c => <option key={c.id} value={c.documentId}>{c.name}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-stone-800 mr-1">البراند</label>
          <select
            {...register("brand_id", { required: true })}
            className={`w-full border p-2.5 rounded-lg bg-white outline-none ${errors.brand_id ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">اختر البراند</option>
            {brands?.map(b => <option key={b.id} value={b.documentId}>{b.name}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-stone-800 mr-1">كمية السايب (كجم)</label>
          <input
            type="number"
            {...register("bulk_quantity", { required: true, min: 0 })}
            placeholder="مثال: 50"
            className={`w-full border p-2.5 rounded-lg outline-none ${errors.bulk_quantity ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>
      </div>

      {/* varients */}
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-t-xl border-b">
          <h3 className="font-bold text-stone-800">متغيرات المنتج (الأحجام والأنواع)</h3>
          <button
            type="button"
            onClick={() => append({ attribute_id: '', cost_price: '0', quantity: '0', barcode: '', attributeSet: '' })}
            className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
          >
            <span>+</span> إضافة متغير جديد
          </button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-stone-900 mr-1">نوع المنتج</label>
                <select
                  {...register(`variants.${index}.attributeSet`, { required: true })}
                  className={`border p-2 rounded-md text-sm outline-none ${errors.variants?.[index]?.attributeSet ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">النوع</option>
                  {attributeSet?.map(a => <option key={a.id} value={a.documentId}>{a.name}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-stone-900 mr-1">الحجم</label>
                <select
                  {...register(`variants.${index}.attribute_id`, { required: true })}
                  className={`border p-2 rounded-md text-sm outline-none ${errors.variants?.[index]?.attribute_id ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">اختر الحجم</option>
                  {attribute?.map(a => <option key={a.id} value={a.documentId}>{a.name}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-stone-900 mr-1">سعر الشراء</label>
                <input
                  type="number"
                  {...register(`variants.${index}.buying_price`,)}
                  placeholder="0.00"
                  className={`border p-2 rounded-md text-sm outline-none ${errors.variants?.[index]?.buying_price ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-stone-900 mr-1">سعر البيع</label>
                <input
                  type="number"
                  {...register(`variants.${index}.cost_price`, { required: true, min: 0 })}
                  placeholder="0.00"
                  className={`border p-2 rounded-md text-sm outline-none ${errors.variants?.[index]?.cost_price ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-stone-900 mr-1">الكمية (قطعة)</label>
                <input
                  type="number"
                  {...register(`variants.${index}.quantity`,)}
                  placeholder="0"
                  className={`border p-2 rounded-md text-sm outline-none ${errors.variants?.[index]?.quantity ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>


              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-stone-900 mr-1">الباركود (اختياري)</label>
                <input
                  type="text"
                  {...register(`variants.${index}.barcode`)}
                  placeholder="Barcode"
                  className="border border-gray-300 p-2 text-stone-800 rounded-md text-sm outline-none"
                />
              </div>

              <div className="flex items-end justify-center">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="w-full bg-red-50 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white transition-colors text-sm font-medium"
                >
                  حذف السطر
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded">
          <p className="text-red-700 text-sm font-bold">
            يرجى تعبئة جميع الحقول المطلوبة (اسم المنتج، القسم، البراند، والبيانات داخل كل متغير).
          </p>
        </div>
      )}

      <div className="pt-6 border-t flex justify-first">
        <button
          type="submit"
          className="bg-stone-900 text-white px-10 py-3  rounded-xl font-bold text-lg hover:bg-stone-700 shadow-lg transition-all active:scale-95"
        >
          حفظ المنتج
        </button>
      </div>

    </form>
  );
}