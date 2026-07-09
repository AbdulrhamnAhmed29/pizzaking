import { useState } from "react";
import { servicesOrders } from "../../orders/servicesOrders/ServicesOrders";
import { useQuery } from "@tanstack/react-query";
import { ExpensesServises } from "../../expenses/services/servicesExpenses";

export const useStatistcs = () => {
    const today1 = new Intl.DateTimeFormat('sv-SE').format(new Date());
    // to reports 
    const [startDay, setStartDay] = useState(today1);
    const [endDay, setEndDay] = useState(today1);

    // to orders reports 
    const { data: reportsOrders } = useQuery({
        queryKey: ["ordersToReports", startDay, endDay],
        queryFn: () => servicesOrders.getOrdersToReports(startDay, endDay),
        keepPreviousData: true,
    });
 
    // to Expenses reports 

    const { data: ReportsExpesnse } = useQuery({
        queryKey: ["expensesReports", endDay, startDay],
        queryFn: () => ExpensesServises.getExpensesToReports(startDay, endDay),
    });


    return {
        // orders 
        reportsOrders,
        // Expenses 
        ReportsExpesnse,
        // to filtration by time 
        startDay,
        endDay,
        setEndDay,
        setStartDay,
        // orderItems 
    }

}