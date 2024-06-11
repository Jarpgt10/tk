import { createContext, useEffect, useState } from "react";
import { httpGetAllMenu } from "../services/menu-services";
import { httpGetAllRol } from "../services/rol-services";
import { httpGetAllUser } from "../services/user-services";
import { httpGetAllAreas } from "../services/area-services";
import { httpGetAllTicket } from "../services/ticket-services";





export const TicketContext = createContext();

export const TicketState = (props) => {
    const [ticket, setTicket] = useState([]);
    const [area, setArea] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getAll();
    }, [])


    const getAll = async () => {
        setLoading(true)
        httpGetAllUser().then((res) => setUsuario(res));
        httpGetAllTicket().then((res) => setTicket(res));
        await httpGetAllAreas(true).then((res) => setArea(res)).finally(() => setLoading(false))
    }


    return (
        <TicketContext.Provider
            value={{
                area,
                usuario,
                setLoading,
                loading,
                getAll,
                ticket,
            }}
        >
            {props.children}
        </TicketContext.Provider>
    );
};


