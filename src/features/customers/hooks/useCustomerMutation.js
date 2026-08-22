
import { useMutation, useQuery } from '@tanstack/react-query';
import { customerServices } from '../services/customerServices';
export const useCustomer = () => {
    console.log("🔥 useCustomer called");

    const { data: customers } = useQuery({
        queryKey: ['customers'],
        queryFn: customerServices.getCustomers,
    });
    const CustomerRes = useMutation({
        mutationFn: customerServices.createCustomer,
    });

    return {
        customers,
        addCustomer: CustomerRes.mutate,
    }
}