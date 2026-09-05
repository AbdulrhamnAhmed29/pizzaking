import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BrandServices } from "../services/BrandServices";

export const useMutationBrands = () => {
    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: (payload) => BrandServices.createBrand(payload),
        onSuccess: () => {
            queryClient.invalidateQueries("brands");
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }) => BrandServices.updateBrand(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries("brands");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => BrandServices.deleteBrand(id),
        onSuccess: () => {
            queryClient.invalidateQueries("brands");
        }
    });

    return{
        addMutation: addMutation.mutate,
        updateMutation: updateMutation.mutate,
        deleteMutation: deleteMutation.mutate,
    }
}