import { Input, Modal, Table } from 'antd'
import React, { useContext, useState } from 'react'
import Icon from '../../utilties/Icon';
import { UsuarioContext } from '../../context/usuario/UsuarioContext';
import ModalRol from './ModalRol';

export default function Rol() {
    const { menu, roles, loading, getAll } = useContext(UsuarioContext);
    // const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [DataRol, setDataRol] = useState(null);
    const pageSize = 10; // Define el tamaño de página (10 elementos)
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * pageSize; // Calcula el índice inicial
    const endIndex = startIndex + pageSize; // Calcula el índice final
    const displayedData = roles?.slice(startIndex, endIndex); // Filtra los datos para la página actual





    const handleCancelModal = () => {
        setDataRol(null);
        setOpenModal(false);
    }

    const handleOnClose = () => {
        setOpenModal(false);
        setDataRol(null)
        getAll();
    }
    const handleEdit = (data) => {
        setDataRol(data);
        setOpenModal(true);

    }

    return (
        <div className='h-screen px-[5%] py-[5%]'>
            <div className='title-1 flex-between'>
                <span>ROL</span>
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
                    onChange: (page) => setCurrentPage(page), // Actualiza la página actual
                    pageSize: pageSize, // Define el tamaño de página (10 elementos)
                    current: currentPage, // Página actual
                    total: roles?.length || 0, // Total de elementos (si `area` está disponible)
                }}
            >

            </Table>

            <Modal
                open={openModal}
                footer={null}
                onCancel={() => handleCancelModal()}
                title={<div>{DataRol ? 'Editar' : 'Crear'} Rol</div>}
                width={400}
            >

                <ModalRol data={DataRol} onClose={() => handleOnClose()} />
            </Modal>
        </div>

    )
}
