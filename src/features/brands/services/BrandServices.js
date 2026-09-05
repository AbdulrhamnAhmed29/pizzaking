import BaseApi from "../../../api/baseApi"

export const BrandServices = {

    getBrands: async () => {
        const { data } = await BaseApi.getAll("/brands?populate=*");
        return data
    },
    createBrand: async (payload) => {
        const { data } = await BaseApi.create("/brands", payload);
        console.log("createBrand data:");
        return data
    },
     getBrandById : async (id) => {
        console.log("is woark services")
        console.log(id);
        
        const { data } = await BaseApi.getById("/brands", id , "");
        return data
    },
    updateBrand: async (id, payload) => {
        const { data } = await BaseApi.update(`/brands`, id, payload);
        return data
    },
    deleteBrand: async (id) => {
        const { data } = await BaseApi.remove(`/brands` , id);
        return data
    }
}