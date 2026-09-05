
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { customerServices } from '../services/customerServices';
export const useCustomer = (id) => {
    const queryClient = useQueryClient();
    const { data: customers } = useQuery({
        queryKey: ['customers'],
        queryFn: customerServices.getCustomers,
    });
    const { data: customerById } = useQuery({
        queryKey: ['customerById', id],
        queryFn: () => customerServices.getCustomerById(id),
        enabled: !!id, // Only run the query if id is provided
    });
    const CustomerRes = useMutation({
        mutationFn: (customerData) => customerServices.createCustomer(customerData),
        onSuccess: () => {
            queryClient.invalidateQueries(['customers']);
        }
    });
    const createPaymentRes = useMutation({
        mutationFn: (paymentData) => customerServices.createPayments(paymentData),
    });

    const handleDeleteCustomer = useMutation({
        mutationFn: (customerId) => customerServices.deleteCustomer(customerId),
        onSuccess: () => {
            // Invalidate the 'customers' query to refetch the updated list of customers
            queryClient.invalidateQueries(['customers']);
        }
    });

    return {
        customers,
        customerById,
        addCustomer: CustomerRes.mutate,
        deleteCustomer: handleDeleteCustomer.mutate,
        createPayment: createPaymentRes.mutate,
    }
}