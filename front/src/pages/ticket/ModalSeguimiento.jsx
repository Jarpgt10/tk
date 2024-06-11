import React, { useContext, useState, useRef, useEffect } from 'react'
import Icon from '../../utilties/Icon'
import { Button, Form, Input, message } from 'antd'
import { AuthContext } from '../../context/authContext';
import { httpAddTicketComment } from '../../services/ticket-services';

export default function ModalSeguimiento({ data, onClose }) {

    const formRef = useRef();
    const { session } = useContext(AuthContext);
    const detalle = data.detalle_ticket;
    const [OpenForm, setOpenForm] = useState(false);



    useEffect(() => {
        if (formRef.current && data) {
            formRef.current.resetFields();
        }
    }, [data]);

    if (formRef.current && !data) {
        formRef.current.resetFields();
    }


    const handleSubmit = (values) => {
        const dataSend = {
            ...values,
            id_ticket: data.id_ticket,
            id_usuario: session && session.id_usuario,
        }

        httpAddTicketComment(dataSend).then((res) => {
            if (!res.err) {
                message.success(res.message);
            } else {
                message.error(res.message);

            }
        }).finally(() => onClose());

    }

    return (
        <>
            <div className="bg-gray-300 rounded-md h-[450px] mx-10 my-5 overflow-y-auto p-4 scroll-auto">
                {detalle.map((opt) => (
                    <div
                        className={`flex flex-col ${parseInt(opt.id_usuario) === parseInt(session.id_usuario) ? 'items-end' : 'items-start'
                            } mb-4`}
                        key={opt.id}
                    >
                        <div className="text-gray-600 mb-1">
                            <strong>{opt.nombre_completo}</strong>
                        </div>
                        <div
                            className={`${parseInt(opt.id_usuario) === parseInt(session.id_usuario) ? 'bg-[#005c4b]' : 'bg-[#202c33]'
                                } p-2 rounded-lg text-white max-w-xs`}
                        >
                            <p>{opt.comentario}</p>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            {opt.fecha_creacion}
                        </div>
                    </div>
                ))}
            </div>


            <div className={`grid ${OpenForm ? 'grid-cols-5' : 'grid-cols-1'}`}>
                <div className="col-span-1 flex items-center justify-center">
                    <strong className="bg-gray-800 rounded-full p-2 flex items-center justify-center cursor-pointer" onClick={() => setOpenForm(!OpenForm)}>
                        <Icon.add size={20} color="white" />
                    </strong>

                </div>
                <div
                    className={`col-span-4 transition-all duration-500 ease-in-out pr-10 ${OpenForm ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    {OpenForm && (
                        <>
                            <Form layout="vertical" onFinish={handleSubmit} ref={formRef}>
                                <div className="flex">
                                    <Form.Item label="Comentario" name="comentario" className="w-full" rules={[{ required: true, message: "Ingrese Comentario" }]}>
                                        <Input.TextArea placeholder="Añade un comentario..." />
                                    </Form.Item>
                                </div>
                                <div className='flex justify-end'>
                                    <Button className="button-submit mt-2" type="default" htmlType="submit">Guardar</Button>
                                </div>
                            </Form>

                        </>
                    )}
                </div>
            </div>

        </>
    )
}
