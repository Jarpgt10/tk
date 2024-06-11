import { Input, Modal, Table } from 'antd'
import React, { useContext, useState } from 'react'
import Icon from '../../utilties/Icon';
import { TicketContext } from '../../context/TicketContext';
import { AuthContext } from '../../context/authContext';
import ModalSeguimiento from './ModalSeguimiento';

export default function Ticket() {
    const { ticket, loading, getAll } = useContext(TicketContext);
    const { session } = useContext(AuthContext)
    const [openModal, setOpenModal] = useState({ seg: false, edit: false });
    const [dataTicket, setDataTicket] = useState(null);
    const pageSize = 10; // Define el tamaño de página (10 elementos)
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * pageSize; // Calcula el índice inicial
    const endIndex = startIndex + pageSize; // Calcula el índice final
    const displayedData = ticket?.slice(startIndex, endIndex); // Filtra los datos para la página actual


    const handleEdit = (data) => {

        setDataTicket(data);
    }


    const handleSeg = (data) => {
        setDataTicket(data)
        setOpenModal({ seg: true });
    }

    const handleCancelModal = () => {
        setDataTicket(null)
        setOpenModal({ seg: false, edit: false });
    }

    const handleClose = () => {
        setDataTicket(null)
        setOpenModal({ seg: false, edit: false });
        getAll();

    }


    return (
        <div className='h-screen px-[5%] py-[5%]'>
            <div className='title-1 flex-between'>
                <span>Ticket</span>
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
                        dataIndex: 'id_ticket',
                        key: 'id_ticket',
                    },

                    {
                        title: 'Titulo',
                        dataIndex: 'titulo',
                        key: 'titulo',
                    },
                    {
                        title: 'Creado por',
                        dataIndex: 'nombre_completo_creacion',
                        key: 'nombre_completo_creacion',
                    },
                    {
                        title: 'Estado',
                        dataIndex: 'estado',
                        key: 'estado',
                        render: (index, opt) => (
                            <strong className={`${parseInt(opt.estado) === 1 ? 'text-green-600' : 'text-red-700'}`}>{parseInt(opt.estado) === 1 ? 'Activo' : 'Finalizado'}</strong>

                        )
                    },
                    {
                        title: 'Opciones',
                        render: (index, opt) => {

                            return (
                                <div className='flex-center gap-5'>
                                    {session && parseInt(session.id_usuario) === parseInt(opt.id_usuario_creacion) ?
                                        (
                                            <strong className='cursor-pointer' onClick={() => handleEdit(opt)}><Icon.edit className='hover:text-gray-500 ' size={20} /></strong>
                                        ) : (null)
                                    }
                                    < strong className='cursor-pointer' onClick={() => handleSeg(opt)}><Icon.comment className='hover:text-gray-500 ' size={20} /></strong>
                                </div>

                            )
                        }


                    },

                ]}
                pagination={{
                    onChange: (page) => setCurrentPage(page), // Actualiza la página actual
                    pageSize: pageSize, // Define el tamaño de página (10 elementos)
                    current: currentPage, // Página actual
                    total: ticket?.length || 0, // Total de elementos (si `area` está disponible)
                }}
            >
            </Table >


            <Modal open={openModal.edit}>

            </Modal>
            <Modal open={openModal.seg}
                onCancel={() => handleCancelModal()}
                footer={null}
                width={800}
                title={<div className='flex-center text-[#1f2937]'>Seguimiento</div>}
                centered
            >
                <ModalSeguimiento data={dataTicket} onClose={() => handleClose()} />
            </Modal>
        </div >
    )
}
