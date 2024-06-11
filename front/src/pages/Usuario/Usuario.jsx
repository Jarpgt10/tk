import { Input, Modal, Table } from 'antd';
import React, { useContext, useState } from 'react'
import Icon from '../../utilties/Icon';
import { UsuarioContext } from '../../context/usuario/UsuarioContext';
import ModalUsuario from './ModalUsuario';

export default function Usuario() {
    const { usuario, loading, getAll } = useContext(UsuarioContext);
    const [openModal, setOpenModal] = useState(false);
    const [DataUser, setDataUser] = useState(null);
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedData = usuario?.slice(startIndex, endIndex);

    const handleCancelModal = () => {
        setDataUser(null);
        setOpenModal(false);
    }

    const handleOnClose = () => {
        setOpenModal(false);
        setDataUser(null)
        getAll();
    }
    const handleEdit = (data) => {
        setDataUser(data);
        setOpenModal(true);

    }


    return (
        <div className='h-screen px-[5%] py-[5%]'>
            <div className='title-1 flex-between'>
                <span>Usuario</span>
            </div>
            <div className='flex-between'>
                <div></div>
                <div className='flex-center gap-5'><Icon.reload size={25} onClick={() => getAll()} className='cursor-pointer' /><Input.Search /> <button onClick={() => setOpenModal(true)}><Icon.add size={25} color='white' className='bg-[#1f2937] bg-hover-3 rounded-full' /></button></div>
                <div></div>
            </div>

            <Table
                className='mt-5'
                dataSource={displayedData}
                loading={loading}
                columns={[
                    {
                        title: 'No.',
                        dataIndex: 'id_rol_usuario',
                        key: 'id_rol_usuario',
                    },
                    {
                        title: 'Nombre Completo',
                        dataIndex: 'nombre_completo',
                        key: 'nombre_completo',
                    },

                    {
                        title: 'Area',
                        dataIndex: 'nombre_area',
                        key: 'nombre_area',
                    },
                    {
                        title: 'Rol',
                        dataIndex: 'rol',
                        key: 'rol',
                    },
                    {
                        title: 'Estado',
                        dataIndex: 'estado',
                        key: 'estado',
                        render: (index, opt) => (
                            <strong className={`${parseInt(opt.estado) === 1 ? 'text-green-600' : 'text-red-700'}`}>{parseInt(opt.estado) === 1 ? 'Activo' : 'Inactivo'}</strong>

                        )
                    },
                    {
                        title: 'Editar',

                        render: (index, opt) => (
                            <strong className='cursor-pointer' onClick={() => handleEdit(opt)}><Icon.edit className='hover:text-gray-500 ' size={20} /></strong>

                        )
                    },

                ]}
                pagination={{
                    onChange: (page) => setCurrentPage(page),
                    pageSize: pageSize,
                    current: currentPage,
                    total: usuario?.length || 0,
                }}
            >
            </Table>
            <Modal
                open={openModal}
                footer={null}
                onCancel={() => handleCancelModal()}
                title={<div>{DataUser ? 'Editar' : 'Crear'} Usuario</div>}
                width={700}
            >

                <ModalUsuario data={DataUser} onClose={() => handleOnClose()} />
            </Modal>
        </div>
    )
}
