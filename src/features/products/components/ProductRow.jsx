import { Edit2, Trash2, Barcode, Package } from "lucide-react";
import { Link } from "react-router-dom";

export const ProductRow = ({
  product,
  onEdit,
  onDelete,
}) => {
  // =========================================
  // Basic normalization
  // =========================================

  const quantity = Number(product?.quantity) || 0;
  const bulkQuantity = Number(product?.bulk_quantity) || 0;

  const buyingPrice = Number(product?.buying_price) || 0;
  const sellingPrice = Number(product?.cost_price) || 0;

  const totalProfit = sellingPrice - buyingPrice;

  // =========================================
  // Product type
  // =========================================

  const isParent = !product?.parent_id;

  const attributeSetName =
    product?.attribute_sets?.[0]?.name ?? "";

  const attributeName =
    product?.attributes?.[0]?.name ?? "";

  const isLoose = attributeSetName === "سايب";

  // IMPORTANT:
  // Don't detect service using quantity === 0.
  // Use your actual product_type field.
  const isService =
    product?.product_type === "service";

  // =========================================
  // Stock
  // =========================================

  const currentStock = isParent
    ? bulkQuantity
    : quantity;

  const lowStock =
    currentStock > 0 && currentStock < 20;

  const outOfStock =
    currentStock === 0;

  // =========================================
  // Barcode
  // =========================================

  const barcode = product?.barcode?.trim() || "";

  // =========================================
  // If loose products should not appear
  // =========================================

  if (isLoose) {
    return null;
  }

  return (
    <tr
      className={`
        group
        transition-all
        duration-200
        border-b
        border-zinc-50
        hover:bg-zinc-50/80

        ${isParent ? "bg-gray-300" : ""}
      `}
    >

      {/* =====================================
          Product
      ====================================== */}

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">

          {/* Icon */}

          <div
            className={`
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              shrink-0
              transition-colors

              ${
                lowStock || outOfStock
                  ? "bg-red-100 text-red-600"
                  : isParent
                  ? "bg-zinc-200 text-zinc-600"
                  : "bg-zinc-100 text-zinc-500 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]"
              }
            `}
          >
            <Package size={18} />
          </div>

          {/* Name */}

          <div className="flex flex-col min-w-0">

            <h5
              className="
                text-zinc-900
                font-black
                truncate
                group-hover:text-[#D4AF37]
                transition-colors
              "
            >
              {product?.name || "بدون اسم"}
            </h5>

            {attributeName && (
              <p className="text-[13px] text-[#D4AF37] font-black">
                {attributeName}
              </p>
            )}

          </div>

        </div>
      </td>

      {/* =====================================
          Type
      ====================================== */}

      <td className="px-6 py-5 text-center">

        <span
          className={`
            inline-flex
            items-center
            px-3
            py-1
            rounded-lg
            text-xs
            font-black

            ${
              isParent
                ? "bg-zinc-200 text-zinc-700"
                : "bg-[#D4AF37]/10 text-[#B8961E]"
            }
          `}
        >
          {isService
            ? "خدمة"
            : attributeSetName || "منتج"}
        </span>

      </td>

      {/* =====================================
          Selling Price
      ====================================== */}

      <td className="px-6 py-5">

        {!isParent && !isService ? (
          <div className="flex items-center gap-1">

            <span className="text-sm font-black text-zinc-900">
              {sellingPrice.toFixed(2)}
            </span>

            <span className="text-[#D4AF37] text-xs font-bold">
              جنيه
            </span>

          </div>
        ) : (
          <span className="text-zinc-300">
            —
          </span>
        )}

      </td>

      {/* =====================================
          Buying Price
      ====================================== */}

      <td className="px-6 py-5">

        {!isParent && !isService ? (
          <div className="flex items-center gap-1">

            <span className="text-sm font-black text-zinc-900">
              {buyingPrice.toFixed(2)}
            </span>

            <span className="text-[#D4AF37] text-xs font-bold">
              جنيه
            </span>

          </div>
        ) : (
          <span className="text-zinc-300">
            —
          </span>
        )}

      </td>

      {/* =====================================
          Profit
      ====================================== */}

      <td className="px-6 py-5">

        {!isParent && !isService ? (
          <div className="flex items-center gap-1">

            <span
              className={`
                text-sm
                font-black

                ${
                  totalProfit > 0
                    ? "text-emerald-600"
                    : totalProfit < 0
                    ? "text-red-600"
                    : "text-zinc-500"
                }
              `}
            >
              {totalProfit.toFixed(2)}
            </span>

            <span className="text-[#D4AF37] text-xs font-bold">
              جنيه
            </span>

          </div>
        ) : (
          <span className="text-zinc-300">
            —
          </span>
        )}

      </td>

      {/* =====================================
          Stock
      ====================================== */}

      <td className="px-6 py-5 text-center">

        <div className="flex justify-center">

          <span
            className={`
              inline-flex
              min-w-[60px]
              justify-center
              px-3
              py-1.5
              rounded-lg
              text-sm
              font-black

              ${
                outOfStock
                  ? "bg-red-100 text-red-600"
                  : lowStock
                  ? "bg-orange-100 text-orange-600"
                  : "bg-emerald-100 text-emerald-700"
              }
            `}
          >
            {currentStock}
          </span>

        </div>

      </td>

      {/* =====================================
          Barcode
      ====================================== */}

      <td className="px-6 py-5 text-center">

        {!isParent ? (
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              bg-white
              border
              border-zinc-200
              rounded-xl
              shadow-sm
              text-zinc-500
              group-hover:border-[#D4AF37]/30
              transition-colors
            "
          >

            <Barcode
              size={14}
              className="
                text-zinc-400
                group-hover:text-[#D4AF37]
              "
            />

            <span className="text-[10px] font-mono font-bold tracking-tighter">
              {barcode || "---"}
            </span>

          </div>
        ) : (
          <span className="text-zinc-300">
            —
          </span>
        )}

      </td>

      {/* =====================================
          Actions
      ====================================== */}

      <td className="px-6 py-5">

        <div className="flex justify-end gap-2">

          {/* Edit parent */}

          {isParent && (
            <Link
              to={`/update-product/${product.documentId}`}
              className="
                p-2.5
                rounded-xl
                bg-white
                border
                border-zinc-100
                text-blue-500
                hover:bg-blue-500
                hover:text-white
                hover:border-blue-500
                hover:shadow-lg
                hover:shadow-blue-200
                transition-all
                active:scale-90
              "
              title="تعديل"
            >
              <Edit2 size={14} />
            </Link>
          )}

          {/* Delete */}

          <button
            type="button"
            onClick={() =>
              onDelete(product.documentId)
            }
            className="
              p-2.5
              rounded-xl
              bg-white
              border
              border-zinc-100
              text-red-500
              hover:bg-red-500
              hover:text-white
              hover:border-red-500
              hover:shadow-lg
              hover:shadow-red-200
              transition-all
              active:scale-90
            "
            title="حذف"
          >
            <Trash2 size={14} />
          </button>

        </div>

      </td>

    </tr>
  );
};