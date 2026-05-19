import BaseApi from "../../../api/baseApi";
import qs from 'qs';

export const servicesOrders = {
    createOrder: async (payload) => {
        const { data } = await BaseApi.create("/orders", payload);
        return data
    },

    getOrders: async (searchTerm, status, selectedDate) => {
        const filters = { $and: [] };

        // 1. search filter 
        if (searchTerm && searchTerm.trim() !== "") {
            filters.$and.push({
                $or: [
                    { customer: { $contains: searchTerm } },
                    { barcode: { $contains: searchTerm } }
                ]
            });
        }

        // 2. status filter 
        if (status && status !== "الكل") {
            filters.$and.push({ status_order: { $eq: status } });
        }

        if (selectedDate) {

            filters.$and.push({
                createdAt: {
                    $gte: `${selectedDate}T00:00:00.000+03:00`,
                    $lte: `${selectedDate}T23:59:59.999+03:00`
                }
            });
        }

        const query = qs.stringify({
            filters: filters.$and.length > 0 ? filters : {},
            populate: '*',
            sort: ['createdAt:desc'],
            pagination: {
                limit: 2000,
            },
        }, { encodeValuesOnly: true });

        const { data } = await BaseApi.getAll(`/orders?${query}`);
        return data;
    },
    getOrdersToReports: async (startDay, endDay) => {
        const filters = { $and: [] };

        if (startDay && endDay) {
            filters.$and.push({
                createdAt: {
                    $gte: `${startDay}T00:00:00.000+03:00`,
                    $lte: `${endDay}T23:59:59.999+03:00`
                }
            });
        }

        const query = qs.stringify({
            filters: filters.$and.length > 0 ? filters : {},
            populate: {
                order_items: {
                    populate: ['product']
                }
            },
            sort: ['createdAt:desc'],
            pagination: {
                page: 1,      
                pageSize: 20  
            },
        }, { encodeValuesOnly: true });

        const fullUrl = `/orders?${query}`;

        const { data } = await BaseApi.getAll(fullUrl);
        return data;
    },
    getOrderById: async (id) => {

        const query = "populate[order_items][populate][product][populate]=*";

        const { data } = await BaseApi.getById("/orders", id, query);
        return data;
    },
    updateOrder: async (id, data) => {
        const res = await BaseApi.update("orders", id, data);
        return res
    },

    deleteOrder: async (id) => {
        const res = await BaseApi.remove("orders", id);
        return res
    },

    // order items 
    createOrdersItems: async (payload) => {
        const { data } = await BaseApi.create("/order-items", payload);
        return data
    },


}