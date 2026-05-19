import React from 'react';
import Barcode from 'react-barcode';

export const ReceiptDesign = React.forwardRef(({ orderData, cart }, ref) => {
  const orderId = orderData.barcode || '0000';

  return (
    <div
      ref={ref}
      className="p-4 w-[80mm] bg-white text-black font-sans leading-tight"
      style={{ direction: 'rtl', fontFamily: 'Arial, sans-serif' }}
    >
      <style>
        {`
          @media print {
            @page {
              size: 80mm auto;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 5mm;
            }
          }
        `}
      </style>

      {/* Header - Brand Identity */}
      <div className="text-center border-b-2 border-black pb-3 mb-3">
        <h2 className="text-xl font-black mb-1">شركة  آل عامر أبو الدهب</h2>
        <p className="text-[10px] font-bold text-gray-700">جميع أنواع زيوت السيارات والفلاتر</p>
        <p className="text-[10px] font-bold text-gray-700">تغيير زيت | فلاتر | تشحيم | مغسلة سيارات</p>

        <div className="mt-2 text-[9px] text-gray-600 font-medium">
          <p>الجيزة، مطار إمبابة - أول شارع الكيلاني</p>
        </div>
        <div className="mt-1 py-1 border-y border-gray-100 flex justify-between items-center text-[9px]">
          <div className="flex gap-1 items-center">
            <span className="font-bold text-gray-900">محمد السيد :</span>
            <span className="font-mono">01144472233</span>
          </div>
          <div className="w-[1px] h-3 bg-gray-300"></div>
          <div className="flex gap-1 items-center">
            <span className="font-bold text-gray-900">إبراهيم علي :</span>
            <span className="font-mono">01279373024</span>
          </div>
        </div>


      </div>

      {/* Order Info */}
      <div className="grid grid-cols-2 gap-y-1 text-[11px] mb-4 pb-2 border-b border-dashed border-gray-300">
        <p><span className="text-gray-500">رقم الفاتورة:</span> <span className="font-bold">#{orderId}</span></p>
        <p className="text-left"><span className="text-gray-500">التاريخ:</span> {new Date().toLocaleDateString('ar-EG')}</p>
        <p><span className="text-gray-500">العميل:</span> <span className="font-bold">{orderData.customerName || 'عميل نقدي'}</span></p>
        <p className="text-left"><span className="text-gray-500">الوقت:</span> {new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</p>
      </div>

      {/* Items Table */}
      <table className="w-full mb-4 text-[12px]">
        <thead>
          <tr className="border-b border-black text-right">
            <th className="pb-1 font-black">الصنف</th>
            <th className="pb-1 text-center font-black">كمية</th>
            <th className="pb-1 text-left font-black">إجمالي</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {cart.map((item, index) => (
            <tr key={index}>
              <td className="py-2 pr-1">
                <span className="block font-bold leading-none">{item.name}</span>
                {item.attributes?.[0] && (
                  <span className="text-[10px] text-gray-600 block mt-0.5">
                    ({item.attributes[0].name})
                  </span>
                )}
              </td>
              <td className="py-2 text-center font-bold">x{item.quantity}</td>
              <td className="py-2 text-left font-bold">
                {(item.cost_price * item.quantity).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary Section */}
      <div className="border-t-2 border-black pt-2 space-y-1.5">
        <div className="flex justify-between text-[12px]">
          <span>الإجمالي:</span>
          <span className="font-bold">{orderData?.totalPrice?.toLocaleString()} ج.م</span>
        </div>

        {orderData?.discount > 0 && (
          <div className="flex justify-between text-[12px] text-red-600 font-bold italic">
            <span>الخصم:</span>
            <span>-{orderData?.discount?.toLocaleString()} ج.م</span>
          </div>
        )}

        <div className="flex justify-between items-center  text-black  border-black border-t-2  p-2 mt-2 rounded-sm">
          <span className="text-xs font-bold uppercase">الصافي النهائي</span>
          <span className="text-lg font-black tracking-tighter">
            {orderData?.finalPrice?.toLocaleString()} <small className="text-[10px]">ج.م</small>
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col items-center">
        <Barcode
          value={orderId}
          width={1.2}
          height={30}
          fontSize={10}
          background="transparent"
          margin={0}
        />

        <p className="mt-4 text-[9px] font-bold text-gray-400">شكراً لزيارتكم</p>

        {/* Dev Signature - Minimalist & Clean */}
        <div className="mt-4 pt-2 border-t border-gray-100 w-full flex justify-between items-center opacity-40">
          <span className="text-[7px] tracking-[2px]">SYS V.1.0</span>
          <div className="text-right">
            <p className="text-[8px] font-black uppercase">Abdulrhman Ahmed</p>
            <p className="text-[6px] text-center italic">system Architect</p>
          </div>
        </div>
      </div>
    </div>
  );
});