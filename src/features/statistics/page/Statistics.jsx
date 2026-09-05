import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Wallet, Zap, Package, TrendingUp, AlertCircle, Printer } from 'lucide-react';
import { useStatistcs } from '../hooks/useStatistics';
import { motion, animate } from 'framer-motion';
import { ThermalReceipt } from './ThermalReceipt';
import { useReactToPrint } from 'react-to-print';
import { ORDER_STATUS } from '../../../constants/orderStatus';



// Animation for Number 
const AnimatedNumber = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);
    useEffect(() => {
        const controls = animate(0, value, {
            duration: 1.5, ease: "easeOut",
            onUpdate: (latest) => setDisplayValue(Math.floor(latest))
        });
        return () => controls.stop();
    }, [value]);
    return <span>{displayValue.toLocaleString()}</span>;
};

const Statistics = () => {
    const { reportsOrders, ReportsExpesnse, reportsCustomer, startDay, endDay, setEndDay, setStartDay } = useStatistcs();

    // ==== print receipt ref ====
    const receiptRef = useRef(null);
    const handlePrintReceipt = useReactToPrint({
        contentRef: receiptRef,
    });
    console.log("reportsCustomer", reportsCustomer);
    const totalCreditPayments = useMemo(() => {
        if (!reportsCustomer) return 0;
        return reportsCustomer.reduce((total, customer) => {
            const customerPayments = customer.payments?.reduce(
                (sum, pay) => {
                    return sum + Number(pay.payed_amount || pay.amount || 0);

                }, 0
            ) || 0;
            return total + customerPayments;
        }, 0);
    }, [reportsCustomer]);

    const totalExpenses = useMemo(() => {
        return ReportsExpesnse?.reduce((acc, curr) => acc + Number(curr.price || 0), 0) || 0;
    }, [ReportsExpesnse]);

    // 3. حسابات الأوردرات الشاملة (المبيعات، الربح، الآجل، الكاش، الخصومات)
    const metrics = useMemo(() => {
        if (!reportsOrders) return {
            sales: 0,
            creditTotal: 0,
            cashTotal: 0,
            count: 0,
            cashCount: 0,
            creditCount: 0,
            totalDiscount: 0,
            grossProfit: 0
        };

        return reportsOrders.reduce((acc, curr) => {
            const finalPrice = Number(curr.final_price || 0);
            const discount = Number(curr.discount || 0);

            // إجمالي المبيعات من كل الأوردرات
            acc.sales += finalPrice;
            acc.totalDiscount += discount;
            acc.count += 1;

            // فلترة وحساب الأوردرات الآجل والكاش بناءً على status_order
            if (curr.status_order === ORDER_STATUS.CREDIT) {
                acc.creditTotal += finalPrice;
                acc.creditCount += 1;
            } else {
                acc.cashTotal += finalPrice;
                acc.cashCount += 1;
            }

            // حساب أرباح الأوردر (سعر البيع - سعر الشراء) * الكمية
            const orderProfit = curr.order_items?.reduce((sum, item) => {
                const qty = Number(item.quantityInOrder || 0);
                const unitSelling = Number(item.unit_price || 0);
                const unitBuying = Number(item.buying_price || 0);
                return sum + ((unitSelling - unitBuying) * qty);
            }, 0) || 0;

            acc.grossProfit += orderProfit;

            return acc;
        }, {
            sales: 0,
            creditTotal: 0,
            cashTotal: 0,
            count: 0,
            cashCount: 0,
            creditCount: 0,
            totalDiscount: 0,
            grossProfit: 0
        });
    }, [reportsOrders]);

    // ==== الحسابات النهائية المضبوطة للميزانية ====

    // الآجل المتبقي (الديون) = إجمالي الأوردرات الآجل - التسويات المدفوعة
    const remainingCreditDebt = Math.max(0, metrics.creditTotal - totalCreditPayments);

    // الدرج (الخزنة) = (مبيعات الكاش + تسويات الآجل) - المصروفات
    const cashInDrawer = (metrics.cashTotal + totalCreditPayments) - totalExpenses;

    // صافي الربح = مجموع ربح القطع المبيعة - المصروفات
    const netProfit = metrics.grossProfit - totalExpenses;

    // المنتجات الأكثر ربحية
    const topSellingProducts = useMemo(() => {
        if (!reportsOrders) return [];
        const productMap = {};
        reportsOrders.forEach((order) => {
            order.order_items?.forEach((item) => {
                const productName = item.product?.name || "منتج غير معروف";
                const productSize = item.product_type || "بدون نوع";
                const uniqueKey = `${productName} - ${productSize}`;
                const qty = Number(item.quantityInOrder || 0);
                const unitSellingPrice = Number(item.unit_price || 0);
                const unitBuyingPrice = Number(item.buying_price || 0);
                const profitPerUnit = unitSellingPrice - unitBuyingPrice;
                const totalProfitForThisItem = profitPerUnit * qty;

                if (productMap[uniqueKey]) {
                    productMap[uniqueKey].totalQty += qty;
                    productMap[uniqueKey].totalProfit += totalProfitForThisItem;
                } else {
                    productMap[uniqueKey] = { name: productName, size: productSize, totalQty: qty, totalProfit: totalProfitForThisItem };
                }
            });
        });
        return Object.values(productMap).sort((a, b) => b.totalProfit - a.totalProfit);
    }, [reportsOrders]);

    // كروت واجهة المستخدم
    const cards = [
        { label: 'إجمالي المبيعات', value: metrics.sales, icon: Zap, color: '#D4AF37' },
        { label: 'المصروفات', value: totalExpenses, icon: Wallet, color: '#EF4444' },
        { label: 'الآجل (الديون الحالية)', value: remainingCreditDebt, icon: AlertCircle, color: '#F59E0B' },
        { label: 'الخصومات', value: metrics.totalDiscount, icon: AlertCircle, color: '#D4AF37' },
        { label: 'الدرج (الخزنة)', value: cashInDrawer > 0 ? cashInDrawer : 0, icon: TrendingUp, color: '#10B981' },
        { label: 'صافي الربح', value: netProfit, icon: TrendingUp, color: netProfit >= 0 ? '#10B981' : '#EF4444' },
        { label: 'إجمالي الطلبات', value: metrics.count, icon: Package, color: '#D4AF37', isUnit: false },
        { label: 'طلبات كاش', value: metrics.cashCount, icon: Package, color: '#D4AF37', isUnit: false },
        { label: 'طلبات أجل', value: metrics.creditCount, icon: Package, color: '#D4AF37', isUnit: false },
    ];

    const maxProfit = Math.max(...topSellingProducts.map(p => p.totalProfit), 1);

    return (
        <div className="p-6 bg-[#FDFDFD] min-h-screen text-[#1F1F1F] font-arabic relative" dir="rtl">
            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    .thermal-receipt-container, .thermal-receipt-container * { visibility: visible; }
                    .thermal-receipt-container {
                        position: absolute; left: 0; top: 0; width: 80mm; display: block !important;
                    }
                    @page { size: 80mm auto; margin: 0; }
                }
                .dir-rtl { direction: rtl; }
            `}</style>

            <div className="print:hidden">
                <h1 className="text-4xl font-black mb-8">لوحة <span className="text-[#D4AF37]">الإحصائيات</span></h1>

                <div className="flex justify-between items-center mb-10 p-5 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex gap-6">
                        <input type="date" value={startDay} onChange={(e) => setStartDay(e.target.value)} className="px-4 py-2 rounded-xl bg-gray-50 border font-bold outline-none" />
                        <input type="date" value={endDay} onChange={(e) => setEndDay(e.target.value)} className="px-4 py-2 rounded-xl bg-gray-50 border font-bold outline-none" />
                    </div>

                    <button
                        onClick={handlePrintReceipt}
                        className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#bfa032] text-black font-black px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                        <Printer className="w-5 h-5" />
                        <span>طباعة تقرير الفتره</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {cards.map((card, i) => (
                        <motion.div key={i} className="bg-white p-6 shadow-xl rounded-2xl border-b-4" style={{ borderBottomColor: card.color }}>
                            <p className="text-gray-400 text-sm font-black uppercase">{card.label}</p>
                            <h3 className="text-2xl font-black mt-2">
                                <AnimatedNumber value={card.value} />
                                {card.isUnit !== false && <span className="text-xs text-gray-400"> ج.م</span>}
                            </h3>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-black mb-8 text-[#1F1F1F]">
                        أكثر المنتجات <span className="text-[#D4AF37]">ربحية</span>
                    </h2>
                    <div className="space-y-8">
                        {topSellingProducts.map((product, i) => {
                            const percentage = (product.totalProfit / maxProfit) * 100;
                            const profitPerUnit = product.totalQty > 0 ? (product.totalProfit / product.totalQty) : 0;

                            return (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <h4 className="font-bold text-[#1F1F1F]">{product.name} <span className="text-gray-400 text-xs">({product.size})</span></h4>
                                            <p className="text-xs text-gray-500">
                                                بيع {product.totalQty} قطعة | ربح القطعة: {profitPerUnit.toFixed(1)} ج.م
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[#D4AF37] font-black text-lg">{product.totalProfit.toLocaleString()} ج.م</p>
                                        </div>
                                    </div>
                                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C160] rounded-full"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="thermal-receipt-container hidden">
                <ThermalReceipt
                    startDay={startDay}
                    endDay={endDay}
                    metrics={{
                        ...metrics,
                        debt: remainingCreditDebt,
                        received: cashInDrawer
                    }}
                    totalExpenses={totalExpenses}
                    netProfit={netProfit}
                    topSellingProducts={topSellingProducts}
                    totalDicount={metrics.totalDiscount}
                    receiptRef={receiptRef}
                />
            </div>
        </div>
    );
};

export default Statistics;