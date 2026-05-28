import { useQueryClient, useMutation } from '@tanstack/react-query';
import { servicesOrders } from '../servicesOrders/ServicesOrders';
import { useGetProducts } from "../../products/hooks/UseGetProducts"
import productService from '../../products/services/Services';
import { BULK, ORDER_STATUS, PRODUCT_TYPE } from '../../../constants/orderStatus';
export const useOrderMutation = () => {
    const queryClient = useQueryClient()
    const { data } = useGetProducts();

    const playSaleSound = () => {
        const audio = new Audio('/sound/sell.mp3');
        audio.play().catch(err => console.log("الصوت محتاج تفاعل أولاً"));
    };
    const mutation = useMutation({
        mutationFn: async ({ orderData, cart }) => {
            const customerResponse = await servicesOrders.createCustomer({
                data: {
                    name: orderData.customerName.trim(),
                    phone: orderData.customerPhone,
                }
            });
            const customerId = customerResponse?.documentId;
            const orderResponse = await servicesOrders.createOrder({
                data: {
                    customers: customerId,
                    total_price: orderData.totalPrice,
                    status_order: orderData.paymentStatus,
                    discount: orderData.discount,
                    final_price: orderData.finalPrice,
                    barcode: orderData.barcode,
                    paid_amount: orderData.paymentStatus === ORDER_STATUS.CASH ? orderData.finalPrice : orderData.paid_amount,
                }
            });
            const orderDocId = orderResponse?.documentId;

            const itemPromises = cart.map(async (item) => {
                const productType = item.product_type || item.attributes?.[0]?.name;
                const isService = productType === PRODUCT_TYPE.SERVICE;
                const is_bulk = item.attribute_sets?.[0]?.name === BULK.BULK;
                const originalProduct = data?.data?.find(p => p.documentId === item.documentId);

                let updatePayload = null;
                let targetDocId = item.documentId;

                if (!isService) {
                    if (is_bulk) {
                        const parentProductDocId = originalProduct?.parent_id;
                        const parentProduct = data?.data?.find((p) => p.documentId === parentProductDocId);
                        if (parentProduct) {
                            const currentStockInBulk = Number(parentProduct.bulk_quantity || 0);
                            const conversionFactor = Number(item.attributes?.[0]?.conversion_factor || 1);
                            const itemStockFactor = conversionFactor * Number(item.quantity);
                            const finalStockInBulk = currentStockInBulk - itemStockFactor;
                            updatePayload = { bulk_quantity: finalStockInBulk };
                            targetDocId = parentProduct.documentId;
                        }
                    } else {
                        const currentStock = Number(originalProduct?.quantity || 0);
                        const itemStockInOrder = Number(item.quantity);
                        const finalStock = currentStock - itemStockInOrder;
                        updatePayload = { quantity: finalStock };
                    }
                }

                const orderItemsPayload = {
                    data: {
                        order: orderDocId,
                        product: item.documentId,
                        quantityInOrder: item.quantity,
                        buying_price: isService ? 0 : (item.buying_price || 0),
                        unit_price: item.cost_price,
                        sub_total: item.cost_price * item.quantity,
                        attribute_sets: item.attribute_sets?.[0]?.documentId,
                        product_type: productType
                    }
                };

                const promises = [
                    servicesOrders.createOrdersItems(orderItemsPayload)
                ];

                if (updatePayload !== null) {
                    promises.push(productService.updateProduct(targetDocId, { data: updatePayload }));
                }

                return Promise.all(promises);
            });

            return await Promise.all(itemPromises);
        },
        onSuccess: async () => {
            playSaleSound();
            await queryClient.cancelQueries({ queryKey: ["products"] });
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
                status_order: payload.updatedData.status_order,
                update_price: payload.updatedData.update_price,
                final_price: payload.updatedData.final_price,
                paid_amount: payload.updatedData.paid_amount
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