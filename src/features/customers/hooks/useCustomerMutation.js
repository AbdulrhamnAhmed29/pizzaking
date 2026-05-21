
import { useMutation } from '@tanstack/react-query';
import { customerServices } from '../services/customerServices';
export const useCustomer = () => {
    const CustomerRes = useMutation({
        mutationFn: customerServices.createCustomer({
            data: {
                name: "",
                phone: "",
            },          
        })
    });

    return {
        addCustomer:CustomerRes.mutate,
    }
}