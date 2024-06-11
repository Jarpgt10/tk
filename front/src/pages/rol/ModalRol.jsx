import { Button, Form, Input, Select, Switch, message } from 'antd'
import React, { useRef, useEffect, useContext } from 'react'
import { UsuarioContext } from '../../context/usuario/UsuarioContext';
import { httpAddOrUpdateRol } from '../../services/rol-services';

export default function ModalRol({ data, onClose }) {
    const { menu } = useContext(UsuarioContext);
    const formRef = useRef();

    if (formRef.current && !data) {
        formRef.current.resetFields();
    }

    useEffect(() => {
        formRef.current.resetFields();
    }, [data])

    const handleSubmit = async (values) => {

        const sendData = {
            ...values,
            estado: values.estado ? 1 : 0,
            id_rol_usuario: data ? parseInt(data.id_rol_usuario) : 0
        }
        httpAddOrUpdateRol(sendData).then((res) => {
            if (!res.err) {
                message.success(res.message);
            } else {
                message.error(res.message);
            }
        }).finally(() => onClose())
    }


    return (
        <Form onFinish={handleSubmit} layout='vertical' ref={formRef} initialValues={data && {
            estado: parseInt(data.estado) === 1 ? true : false,
            rol: data.rol,
            ids_menus: data ? data.configuracion.map(config => config.id_menu) : null,
        }}>

            <Form.Item label='Rol' name='rol' rules={[{ required: true, message: 'Ingrese rol' }]}>
                <Input />
            </Form.Item>
            <Form.Item label='Permisos' name='ids_menus' rules={[{ required: true, message: 'Seleccione menu' }]}>
                <Select mode='multiple' >
                    {menu.map((opt) => (
                        <Select.Option value={opt.id_menu}>
                            {opt.menu}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {data && <Form.Item label='Estado' name='estado'>
                <Switch />
            </Form.Item>}
            <div className='flex-end'>
                <Button className='button-submit' type='default' htmlType='submit'> Guardar</Button>
            </div>
        </Form>
    )
}
