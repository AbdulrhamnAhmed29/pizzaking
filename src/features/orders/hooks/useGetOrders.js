
import { useQuery } from '@tanstack/react-query'
import { servicesOrders } from '../servicesOrders/ServicesOrders';
import { useState } from 'react';
export const useOrders = (id) => {
    const [searchItem, setSearchitem] = useState("");
    const [status, setStatus] = useState("الكل");
    const today1 = new Intl.DateTimeFormat('sv-SE').format(new Date());
    const [selectedDate, setSelectedDate] = useState(today1);
    const [page, setPage] = useState(1);
    // to reports 
    const [startDay, setStartDay] = useState(today1);
    const [endDay, setEndDay] = useState(today1);
    //   to table orders 
    const { data: orders, isLoading, isFetching } = useQuery({
        queryKey: ["orders", searchItem, status, selectedDate, page],
        queryFn: () => servicesOrders.getOrders(searchItem, status, selectedDate, page),
        keepPreviousData: true,
    });
    // to reports 
    const { data: reportsOrders } = useQuery({
        queryKey: ["ordersToReports", startDay, endDay],
        queryFn: () => servicesOrders.getOrdersToReports(startDay, endDay),
        keepPreviousData: true,
    });
    const {
        data: orderById,
        isLoading: isLoadingSingle,
        isError
    } = useQuery({
        queryKey: ["order", id],
        queryFn: () => servicesOrders.getOrderById(id),
        enabled: !!id,
    });
    return {
        // get orders 
        orders,
        meta: orders?.meta,
        isLoading: isLoading || isFetching,
        // _________
        // _________
        // filtration orders table
        searchItem, setSearchitem,
        status, setStatus,
        setSelectedDate,
        selectedDate,
        // _____________
        //   orderById 
        orderById,
        isLoadingSingle,
        isError,
        // ________________

        // filtration orders reports 
        endDay,
        startDay,
        setStartDay,
        setEndDay,
        reportsOrders,

        // for pagination 
        setPage,
        page

    };
};