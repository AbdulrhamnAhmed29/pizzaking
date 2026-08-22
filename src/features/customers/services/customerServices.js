import BaseApi from "../../../api/baseApi";

export const customerServices = {
    // customer 
    createCustomer: async (payload) => {
        const { data } = await BaseApi.create("/customers", payload);
        return data;
    },
getCustomers: async () => {
    const { data } = await BaseApi.getAll("/customers");
    return data;
}
}  