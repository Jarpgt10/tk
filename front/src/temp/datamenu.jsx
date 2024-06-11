import { AREA, HOME, ROL, TICKET, USER } from "../router/path";
import Icon from "../utilties/Icon";

const DataMenu = [
    {
        id_menu: 1,
        name: 'Home',
        icon: <Icon.home size={25} />,
        url: HOME,
        sub_menu: [],
    },
    {
        id_menu: 2,
        name: 'Ticket',
        icon: <Icon.ticket size={25} />,
        url: TICKET,
        sub_menu: [],
    },
    {
        id_menu: 3,
        name: 'Mantenimiento',
        icon: <Icon.setting size={25} />,
        sub_menu: [
            {
                sub_menu_id: 1,
                sub_menu_name: 'Usuario',
                url_sub_menu: USER,
            },
            {
                sub_menu_id: 2,
                sub_menu_name: 'Area',
                url_sub_menu: AREA,
            },
            {
                sub_menu_id: 3,
                sub_menu_name: 'Rol',
                url_sub_menu: ROL,
            },
        ],
    },





]

export default DataMenu