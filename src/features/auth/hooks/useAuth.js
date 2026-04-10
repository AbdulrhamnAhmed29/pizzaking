import { useMutation } from '@tanstack/react-query';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

// Login Hook
export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data) => authService.login(data),
        onSuccess: (data) => {
            Cookies.set('jwt', data.jwt, { expires: 7, secure: true, sameSite: 'Strict' });
            localStorage.setItem('user', JSON.stringify(data.user.username)); 
            navigate('/dashboard')
          
        },
        onError: (error) => {
            console.error('Login failed:', error.message);
        },
    });
};

// Logout Hook
export const useLogout = () => {
    const navigate = useNavigate();

    return () => {
        // حذف الـ JWT من الكوكيز
        Cookies.remove('jwt');
        authService.logout(); 
        navigate('/login');
    };
};