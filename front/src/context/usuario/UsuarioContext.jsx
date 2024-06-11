import { createContext, useEffect, useState } from "react";
import { httpGetAllAreas } from "../../services/area-services";
import { httpGetAllMenu } from "../../services/menu-services";
import { httpGetAllRol } from "../../services/rol-services";
import { httpGetAllUser } from "../../services/user-services";




export const UsuarioContext = createContext();

export const UsuarioState = (props) => {
    const [menu, setMenu] = useState([]);
    const [roles, setRoles] = useState([]);
    const [area, setArea] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAll();
    }, [])


    const getAll = async () => {
        setLoading(true)
        httpGetAllMenu(true).then((res) => setMenu(res))
        httpGetAllRol(true).then((res) => setRoles(res))
        httpGetAllUser().then((res) => setUsuario(res))
        await httpGetAllAreas(true).then((res) => setArea(res)).finally(() => setLoading(false))
    }


    return (
        <UsuarioContext.Provider
            value={{
                menu,
                roles,
                area,
                usuario,
                setLoading,
                loading,
                getAll,
            }}
        >
            {props.children}
        </UsuarioContext.Provider>
    );
};


