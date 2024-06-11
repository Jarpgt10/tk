import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from '../context/authContext'
import { PRIVATE } from "./path";

export const PublicRoute = () => {

    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to={PRIVATE} />
    }


    return (
        <div>
            <Outlet />
        </div>
    )
}  