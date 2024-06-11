// AuthContext.js
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { httpGetUserData } from "../services/login-services";


const TOKEN_KEY = 'GEOT';
const USER_KEY = 'GEOU';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        window.localStorage.getItem(TOKEN_KEY) ? true : false
    );
    const [session, setSession] = useState(null);


    const login = useCallback(
        function (token, id_usuario) {
            window.localStorage.setItem(TOKEN_KEY, token);
            window.localStorage.setItem(USER_KEY, id_usuario);
            setIsAuthenticated(true);
        },
        []
    );

    const logout = useCallback(
        function () {
            window.localStorage.removeItem(TOKEN_KEY);
            setIsAuthenticated(false);
        },
        []
    );

    useEffect(() => {
        if (isAuthenticated) {
            const tokenEncrypt = window.localStorage.getItem(TOKEN_KEY)
            const userEncrypt = window.localStorage.getItem(USER_KEY)
            httpGetUserData({ token: tokenEncrypt, usuario: userEncrypt }).then((res) => {
                if (!res.isVerifyToken && res.err) {
                    logout();
                } else {
                    setSession(res)
                }
            })
        }
    }, [isAuthenticated]);




    const value = useMemo(
        () => ({
            login,
            logout,
            isAuthenticated,
            session,
        }),
        [login, logout, isAuthenticated, session]
    );

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};

export function useAuthContext() {
    return useContext(AuthContext);
}
