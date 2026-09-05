import { useQuery } from "@tanstack/react-query"
import { BrandServices } from "../services/BrandServices"

export const useGetBrands = (id) => {
    const useQueryBrands = useQuery({
        queryKey: ["brands"],
        queryFn: () => BrandServices.getBrands(),
        staleTime: 1000 * 60 * 5,
    });
    const useQueryBrandById = useQuery({
        queryKey: ["brandById" ,id],
        queryFn: () => BrandServices.getBrandById(id),
        staleTime: 1000 * 60 * 5,
        enabled:!!id
    });

    return {
        brands: useQueryBrands.data,
        isloading: useQueryBrands.isLoading,
        Error: useQueryBrands.error,
        brandById: useQueryBrandById.data,
    }
}