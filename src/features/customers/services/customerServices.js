import BaseApi from "../../../api/baseApi";

export const customerServices = {
    // customer 
    createCustomer: async (payload) => {
        const { data } = await BaseApi.create("/customers", payload);
        return data;
    },
    createPayments: async (payload) => {
        const { data } = await BaseApi.create("/payments", payload);
        return data;
    },
    getCustomers: async () => {
        const { data } = await BaseApi.getAll("/customers?populate=*");
        return data;
    },
    getCustomerById: async (id) => {
        const { data } = await BaseApi.getById(`/customers`, id, "populate=*");
        return data;
    },
    deleteCustomer: async (id) => {
        const { data } = await BaseApi.remove(`/customers`, id);
        return data;
    }
}  