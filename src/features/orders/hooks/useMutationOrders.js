import { useQueryClient, useMutation } from '@tanstack/react-query';
import { servicesOrders } from '../servicesOrders/ServicesOrders';
import { useGetProducts } from "../../products/hooks/UseGetProducts"
import productService from '../../products/services/Services';




export const useOrderMutation = () => {
    const queryClient = useQueryClient()
    const { data } = useGetProducts()
    const playSaleSound = () => {
        const audio = new Audio('/sound/sell.mp3');
        audio.play().catch(err => console.log("الصوت محتاج تفاعل أولاً"));
    };
    const mutation = useMutation({
        mutationFn: async ({ orderData, cart }) => {
            const orderResponse = await servicesOrders.createOrder({
                data: {
                    total_price: orderData.totalPrice,
                    status_order: orderData.paymentStatus,
                    discount: orderData.discount,
                    final_price: orderData.finalPrice,
                    customer: orderData.customerName,
                    barcode: orderData.barcode

                }
            });

            const orderDocId = orderResponse?.documentId;




            const itemPromises = cart.map(async (item) => {
                // 1. cart product
                const originalProduct = data.find(p => p.documentId === item.documentId);
                let updatePayload = {};
                let targetDocId = item.documentId;

                const is_bulk = item.attribute_sets?.[0]?.name === "سايب";
                if (is_bulk) {
                    // if bulk parent discount 
                    const parentProductDocId = originalProduct?.parent_id;
                    const parentProduct = data.find((p) => p.documentId === parentProductDocId);

                    if (parentProduct) {
                        const currentStockInBulk = Number(parentProduct.bulk_quantity || 0);
                        // factor * quantity 

                        const conversionFactor = Number(item.attributes?.[0]?.conversion_factor || 1);

                        const itemStockFactor = conversionFactor * Number(item.quantity);
                        const finalStockInBulk = currentStockInBulk - itemStockFactor;
                        updatePayload = { bulk_quantity: finalStockInBulk };
                        targetDocId = parentProduct.documentId;
                    }
                } else {
                    //  if not bulk 
                    const currentStock = Number(originalProduct?.quantity || 0);
                    const itemStockInOrder = Number(item.quantity);
                    const finalStock = currentStock - itemStockInOrder;

                    updatePayload = { quantity: finalStock };
                }

                // 2.Order Item Payload
                const orderItemsPayload = {
                    data: {
                        order: orderDocId,
                        product: item.documentId,
                        quantityInOrder: item.quantity,
                        buying_price: item.buying_price,
                        unit_price: item.cost_price,
                        sub_total: item.cost_price * item.quantity,
                        attribute_sets: item.attribute_sets?.[0]?.documentId
                    }
                };
                return Promise.all([
                    servicesOrders.createOrdersItems(orderItemsPayload),
                    productService.updateProduct(targetDocId, { data: updatePayload })
                ]);
            });

            return await Promise.all(itemPromises);
        },
        onSuccess: async () => {
            playSaleSound();

            // 1. مسح الكاش تماماً عشان نضمن إن مفيش داتا قديمة تظهر
            await queryClient.cancelQueries({ queryKey: ["products"] });

            // 2. إجبار الكويري إنها تجيب الداتا فوراً من السيرفر
            queryClient.invalidateQueries({
                queryKey: ["products"],
                refetchType: 'all'
            });

  

            console.log("تم التحديث بنجاح بدون ريفرش للصفحة");
        },

    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }) => servicesOrders.updateOrder(id, {
            data: {
                customer: payload.updatedData.customer,
                status_order: payload.updatedData.status_order,
                update_price: payload.updatedData.update_price,
                final_price: payload.updatedData.final_price,
            },
            onError: (error) => {
                console.log(error);

            }
        })
    })

    const removeMutation = useMutation({
        mutationFn: (id) => servicesOrders.deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            console.log("Order deleted and list updated");
        },
        onError: (err) => {
            console.log("Full Error Object:", err);
            const errorMessage = err?.response?.data?.error?.message || "حدث خطأ أثناء الحذف";
            console.log(errorMessage);
        }
    });
    return {
        createOrder: mutation.mutate,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
        update: updateMutation.mutate,
        remove: removeMutation.mutate
    };
};