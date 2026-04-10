import { lazy } from 'react'

// Lazy load components for better performance
const SignIn = lazy(() => import('./features/auth/components/SignIn'));
const dashbored = lazy(() => import('./pages/Dashboard'));


export const routes = [
    {
        path: '/login',
        element: SignIn,
        isPublic: true,
    },
    {
        path: '/dashboard',
        element: dashbored,
        isPublic: false,
    },

]