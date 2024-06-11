import React, { useContext, useState } from 'react';
import DataMenu from '../temp/datamenu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Loading from './Loading';
import Icon from '../utilties/Icon';

export default function Layout({ children }) {
    const { session, logout } = useContext(AuthContext);
    const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);

    if (!session) {
        return (<div><Loading /></div>)
    }

    // Filter DataMenu based on permissions from session
    const filteredDataMenu = DataMenu.filter((menuItem) => {
        return session && session.permisos.some((permission) => parseInt(permission.id_menu) === menuItem.id_menu);
    });



    return (
        <>
            <div className='flex'>
                <div className={`flex flex-col bg-gray-800 text-white h-screen transition-width duration-300 w-16`}>
                    <div className='flex-center mt-2'>
                        <img src={session.url_img} className='rounded-full w-[50px]' />
                        <Icon.arrowLeft onClick={() => logout()} />
                    </div>
                    <nav className="flex flex-col space-y-4 mt-4 px-3">
                        {filteredDataMenu.map((opt) => (
                            <div key={opt.id_menu} className="">
                                <Link
                                    to={opt.sub_menu.length > 0 ? null : opt.url}
                                    onClick={opt.sub_menu.length > 0 ? () => setIsOpenSubMenu(!isOpenSubMenu) : null}
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md flex items-center"
                                >
                                    {opt.icon}
                                </Link>
                                {isOpenSubMenu && (
                                    <div
                                        className={`p-2 absolute  z-50 bg-primary bg-gray-800  shadow-md rounded-lg `}
                                    >
                                        {opt.sub_menu.map((sub) => (
                                            <Link to={sub.url_sub_menu} onClick={() => setIsOpenSubMenu(!isOpenSubMenu)}>
                                                <div key={sub.id_sub_menu} className='py-1 cursor-pointer bg-hover-1 rounded-md p-2  hover:bg-gray-700'>
                                                    {sub.sub_menu_name}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>


                        ))}
                    </nav>
                </div>
                <div className={` bg-[#F3F4F6] w-full `}>{children}</div>
            </div>
        </>
    );
}
