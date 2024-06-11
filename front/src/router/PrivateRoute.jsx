import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from '../context/authContext'
import { PUBLIC } from "./path";
import Layout from "../components/Layout";

export const PrivateRoute = () => {

    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to={PUBLIC} />
    }

    return (
        <Layout>
            <Outlet />
        </Layout>
    )
} 