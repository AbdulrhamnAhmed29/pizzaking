import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { PRODUCT_TYPE } from "../../../constants/orderStatus";

const DEFAULT_VARIANT = {
  attribute_id: "",
  buying_price: "",
  cost_price: "",
  quantity: "",
  barcode: "",
  attributeSet: "",
};

export default function ProductForm({
  categories = [],
  brands = [],
  Mutate,
  attributeSet = [],
  attribute = [],
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    
    clearErrors,
  } = useForm({
    mode: "onBlur",

    defaultValues: {
      name: "",
      category_id: "",
      brand_id: "",
      product_type: "",
      bulk_quantity: "",
      variants: [DEFAULT_VARIANT],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (data) => {
    clearErrors();

    // --------------------------------
    // Normalize data
    // --------------------------------

    const payload = {
      ...data,

      name: data.name.trim(),
      bulk_quantity:
        data.bulk_quantity === ""
          ? 0
          : Number(data.bulk_quantity),

      variants: data.variants.map((variant) => ({
        ...variant,

        buying_price: Number(variant.buying_price),
        cost_price: Number(variant.cost_price),
        quantity: Number(variant.quantity),

        barcode: variant.barcode?.trim() || "",
      })),
    };

    // --------------------------------
    // Extra business validation
    // --------------------------------


   

 

    // --------------------------------
    // Prevent duplicate attributes
    // -----------------------------
    // --------------------------------
    // API mutation
    // --------------------------------

    try {
      await Mutate(payload);

      // Clear cart ONLY after successful mutation
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Product creation failed:", error);
    }
  };

  const addVariant = () => {
    append({
      ...DEFAULT_VARIANT,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-8"
      dir="rtl"
    >
      {/* ================================
          PRODUCT INFORMATION
      ================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-stone-800">
            اسم المنتج
          </label>

          <input
            type="text"
            maxLength={150}
            autoComplete="off"
            {...register("name", {
              required: "اسم المنتج مطلوب",

              validate: (value) =>
                value.trim().length >= 2 ||
                "اسم المنتج يجب أن يكون حرفين على الأقل",
            })}
            className={`w-full border p-2.5 rounded-lg outline-none ${
              errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {errors.name && (
            <span className="text-xs text-red-500">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Product Type */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-stone-800">
            اختر النوع
          </label>

          <select
            {...register("product_type", {
              required: "اختر نوع المنتج",
            })}
            className={`w-full border p-2.5 rounded-lg bg-white outline-none ${
              errors.product_type
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">اختر نوع المنتج</option>

            <option value={PRODUCT_TYPE.PRODUCT}>
              منتج
            </option>

            <option value={PRODUCT_TYPE.SERVICES}>
              خدمة
            </option>
          </select>

          {errors.product_type && (
            <span className="text-xs text-red-500">
              {errors.product_type.message}
            </span>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-stone-800">
            القسم
          </label>

          <select
            {...register("category_id", {
              required: "اختر القسم",
            })}
            className={`w-full border p-2.5 rounded-lg bg-white outline-none ${
              errors.category_id
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">اختر القسم</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.documentId}
              >
                {category.name}
              </option>
            ))}
          </select>

          {errors.category_id && (
            <span className="text-xs text-red-500">
              {errors.category_id.message}
            </span>
          )}
        </div>

        {/* Brand */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-stone-800">
            البراند
          </label>

          <select
            {...register("brand_id", {
              required: "اختر البراند",
            })}
            className={`w-full border p-2.5 rounded-lg bg-white outline-none ${
              errors.brand_id
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">اختر البراند</option>

            {brands.map((brand) => (
              <option
                key={brand.id}
                value={brand.documentId}
              >
                {brand.name}
              </option>
            ))}
          </select>

          {errors.brand_id && (
            <span className="text-xs text-red-500">
              {errors.brand_id.message}
            </span>
          )}
        </div>

        {/* Bulk Quantity */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-stone-800">
            كمية السايب (كجم)
          </label>

          <input
            type="number"
            inputMode="decimal"
            step="any"
            min="0"
            max="1000000"
            {...register("bulk_quantity", )}
            className={`w-full border p-2.5 rounded-lg outline-none ${
              errors.bulk_quantity
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />

          {errors.bulk_quantity && (
            <span className="text-xs text-red-500">
              {errors.bulk_quantity.message}
            </span>
          )}
        </div>
      </div>

      {/* ================================
          VARIANTS
      ================================= */}

      <div className="space-y-4">

        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-t-xl border-b">
          <h3 className="font-bold text-stone-800">
            متغيرات المنتج
          </h3>

          <button
            type="button"
            onClick={addVariant}
            className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-600 hover:text-white transition-all"
          >
            + إضافة متغير
          </button>
        </div>

        {errors.variants?.message && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
            {errors.variants.message}
          </div>
        )}

        <div className="space-y-4">

          {fields.map((field, index) => {

            const variantErrors =
              errors.variants?.[index];

            return (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6 bg-white border border-gray-200 rounded-xl shadow-sm"
              >

                {/* Attribute Set */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-stone-900">
                    النوع
                  </label>

                  <select
                    {...register(
                      `variants.${index}.attributeSet`,
                      {
                        required: "اختر النوع",
                      }
                    )}
                    className={`border p-2 rounded-md text-sm outline-none ${
                      variantErrors?.attributeSet
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">
                      اختر النوع
                    </option>

                    {attributeSet.map((item) => (
                      <option
                        key={item.id}
                        value={item.documentId}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>

                  {variantErrors?.attributeSet && (
                    <span className="text-[10px] text-red-500">
                      {variantErrors.attributeSet.message}
                    </span>
                  )}
                </div>

                {/* Attribute */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-stone-900">
                    الحجم
                  </label>

                  <select
                    {...register(
                      `variants.${index}.attribute_id`,
                      {
                        required: "اختر الحجم",
                      }
                    )}
                    className={`border p-2 rounded-md text-sm outline-none ${
                      variantErrors?.attribute_id
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">
                      اختر الحجم
                    </option>

                    {attribute.map((item) => (
                      <option
                        key={item.id}
                        value={item.documentId}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>

                  {variantErrors?.attribute_id && (
                    <span className="text-[10px] text-red-500">
                      {variantErrors.attribute_id.message}
                    </span>
                  )}
                </div>

                {/* Buying Price */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-stone-900">
                    سعر الشراء
                  </label>

                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0"
                    max="100000000"
                    {...register(
                      `variants.${index}.buying_price`,
                      {
                        required: "السعر مطلوب",

                        setValueAs: (value) =>
                          value === ""
                            ? ""
                            : Number(value),

                        validate: (value) =>
                          Number.isFinite(value) &&
                          value >= 0
                            ? true
                            : "السعر غير صحيح",
                      }
                    )}
                    className={`border p-2 rounded-md text-sm outline-none ${
                      variantErrors?.buying_price
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {variantErrors?.buying_price && (
                    <span className="text-[10px] text-red-500">
                      {variantErrors.buying_price.message}
                    </span>
                  )}
                </div>

                {/* Selling Price */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-stone-900">
                    سعر البيع
                  </label>

                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0"
                    max="100000000"
                    {...register(
                      `variants.${index}.cost_price`,
                      {
                        required: "السعر مطلوب",

                        setValueAs: (value) =>
                          value === ""
                            ? ""
                            : Number(value),

                        validate: (value) =>
                          Number.isFinite(value) &&
                          value >= 0
                            ? true
                            : "السعر غير صحيح",
                      }
                    )}
                    className={`border p-2 rounded-md text-sm outline-none ${
                      variantErrors?.cost_price
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {variantErrors?.cost_price && (
                    <span className="text-[10px] text-red-500">
                      {variantErrors.cost_price.message}
                    </span>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-stone-900">
                    الكمية
                  </label>

                  <input
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    max="1000000"
                    {...register(
                      `variants.${index}.quantity`,
                  
                    )}
                    className={`border p-2 rounded-md text-sm outline-none ${
                      variantErrors?.quantity
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {variantErrors?.quantity && (
                    <span className="text-[10px] text-red-500">
                      {variantErrors.quantity.message}
                    </span>
                  )}
                </div>

                {/* Barcode */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-stone-900">
                    الباركود
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={50}
                    autoComplete="off"
                    {...register(
                      `variants.${index}.barcode`,
                      {
                        setValueAs: (value) =>
                          value?.trim() || "",

                        validate: (value) => {
                          if (!value) return true;

                          return /^[0-9]+$/.test(value)
                            ? true
                            : "الباركود يجب أن يحتوي على أرقام فقط";
                        },
                      }
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                    className={`border p-2 rounded-md text-sm outline-none ${
                      variantErrors?.barcode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />

                  {variantErrors?.barcode && (
                    <span className="text-[10px] text-red-500">
                      {variantErrors.barcode.message}
                    </span>
                  )}
                </div>

                {/* Remove */}
                <div className="flex items-end">
                  <button
                    type="button"
                    disabled={fields.length === 1}
                    onClick={() => remove(index)}
                    className="w-full bg-red-50 text-red-500 py-2 rounded-md hover:bg-red-500 hover:text-white text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    حذف
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ================================
          SUBMIT
      ================================= */}

      <div className="pt-6 border-t">

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-stone-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-stone-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? "جاري الحفظ..."
            : "حفظ المنتج"}
        </button>

      </div>
    </form>
  );
}