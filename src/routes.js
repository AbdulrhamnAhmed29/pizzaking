import { lazy } from 'react'
const mainLayout = lazy(() => import('./layout/MainLayout'));
const SignIn = lazy(() => import('./features/auth/components/SignIn'));
const Products = lazy(() => import('./features/products/pages/ProductsPage'));
const AddProducts = lazy(() => import('./features/products/pages/AddProducts'));
const updateProducts = lazy(() => import('./features/products/pages/UpdateProduct'));
const POSPage = lazy(() => import('./features/sales/pages/POSPage'));
const ordersSales = lazy(() => import('./features/orders/Pages/SalesOrder'));
const orderDetails = lazy(() => import('./features/orders/components/OrderDetails'));
const expenses = lazy(() => import('./features/expenses/expensesPage/ExpensesPage'));
const addexpense = lazy(() => import('./features/expenses/expensesPage/AddExpenses'));
const UpdateExpenses = lazy(() => import('./features/expenses/expensesPage/UpdateExpenses'));
const Statistics = lazy(() => import('./features/statistics/page/Statistics'));
const Clients = lazy(() => import('./features/customers/customerPages/customerPage'));
const customerDetails = lazy(() => import('./features/customers/customerPages/CustomerDetails'));
const customerUpdate = lazy(() => import('./features/customers/customerPages/CustomerUpdate'));
const customerAdd = lazy(() => import('./features/customers/customerPages/CustomerAdd'));
const Brands = lazy(() => import('./features/brands/pages/TableBrands'));
const brandAdd = lazy(() => import('./features/brands/pages/AddBrands'));
const brandUpdate = lazy(() => import('./features/brands/pages/UpdateBrands'));
const NotFoundPage = lazy(() => import('./ui/NotFoundPage'));

export const routes = [

    {
        path: '/login',
        element: SignIn,
        isPublic: true,
    },
    {
        path: '/',
        element: mainLayout,
        isPublic: false,
        children: [
            {
                path: '/',
                element: Statistics,
            },

            {
                path: 'dashboard',
                element: Statistics,
            },
            {
                path: 'clients',
                element: Clients,
            },
            {
                path: 'customerDetails/:id',
                element: customerDetails,
            },
            {
                path: 'customerAdd',
                element: customerAdd,
            },
            {
                path: 'customerUpdate/:id',
                element: customerUpdate,
            },
               {
                path: 'brands',
                element: Brands,
            },
            {
                path: 'brandAdd',
                element: brandAdd,
            },
            {
                path: 'brandUpdate/:id',
                element: brandUpdate,
            },
            {
                path: 'products',
                element: Products,
            },
            {
                path: '/sales',
                element: ordersSales,
            },
            {
                path: '/orderDetails/:id',
                element: orderDetails,
            },
       

            {
                path: 'add-products',
                element: AddProducts,
            },
            {
                path: '/update_expenses/:id',
                element: UpdateExpenses,
            },
            {
                path: 'expense',
                element: expenses,
            },
            {
                path: '/addexpense',
                element: addexpense,
            },

          
            {
                path: 'pos',
                element: POSPage,
            },

            {
                path: 'update-product/:id',
                element: updateProducts,
            },
        ]
    },
    {
        path: '*',
        element: NotFoundPage
    }
]