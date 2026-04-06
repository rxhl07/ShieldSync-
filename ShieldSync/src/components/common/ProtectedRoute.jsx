import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../utils/constants';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect them to the login page, but remember where they were trying to go
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}