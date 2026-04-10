import { lazy } from 'react'
import MainLayout from './layout/MainLayout' // تأكد من المسار الصحيح

const SignIn = lazy(() => import('./features/auth/components/SignIn'));
const Products = lazy(() => import('./pages/Products')); // مثال
const Categories = lazy(() => import('./pages/Categories')); // مثال
const Sections = lazy(() => import('./pages/Sections'));
const Offers = lazy(() => import('./pages/Offers')); // مثال
const finance = lazy(() => import('./pages/Finance'));
 // مثال


export const routes = [
    {
        path: '/login',
        element: SignIn,
        isPublic: true,
    },
    {
        path: '/', // الأب (Layout)
        element: MainLayout,
        isPublic: false,
        children: [
            {
                path: 'dashboard', 
                element: () => <div>إحصائيات المنيو</div>, 
            },
            {
                path: 'products', // سيصبح المسار /products
                element: Products,
            },
            {
                path: 'categories', // سيصبح المسار /categories
                element: Categories,
            },
             {
                path: 'sections', // سيصبح المسار /sections
                element: Sections,
            },
           
              {
                path: 'offers', // سيصبح المسار /offers
                element: Offers,
            },
              {
                path: 'finance', // سيصبح المسار /finance
                element: finance,
            },
            




        ]
    },
    {
        path: '*',
        redirect: '/login'
    }
]