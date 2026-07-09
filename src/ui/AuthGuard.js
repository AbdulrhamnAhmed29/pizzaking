import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AuthGuard = ({ children, isPublic }) => {
    const token = Cookies.get('jwt'); 

    if (!isPublic && !token) {
        return <Navigate to="/login" replace />;
    }
    if (isPublic && token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};