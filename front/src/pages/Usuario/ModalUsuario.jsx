import { Button, Form, Input, Select, Switch, message } from 'antd'
import React, { useContext, useEffect, useRef } from 'react'
import { UsuarioContext } from '../../context/usuario/UsuarioContext';
import { httpAddOrUpdateUser } from '../../services/user-services';
import { encryptPassword } from '../../utilties/cryptoUtils';

export default function ModalUsuario({ data, onClose }) {
    const { roles, area } = useContext(UsuarioContext);


    const formRef = useRef();

    if (formRef.current && !data) {
        formRef.current.resetFields();
    }

    useEffect(() => {
        formRef.current.resetFields();
    }, [data])

    const handleSubmit = async (values) => {
        const dataSend = {
            ...values,
            segundo_nombre: values.segundo_nombre ? values.segundo_nombre : '',
            id_usuario: data ? data.id_usuario : 0,
            estado: values.estado ? 1 : 0,
            configuracion: roles.find(rol => rol.id_rol_usuario === values.id_rol_usuario).configuracion,
            contrasena: encryptPassword('G2024'),

        }


        await httpAddOrUpdateUser(dataSend).then((res) => {
            if (!res.err) {
                message.success(res.message);
            } else {
                message.error(res.message);
            }
        }).finally(() => onClose());
    }



    // console.log(roles);
    return (
        <Form layout='vertical' ref={formRef} onFinish={handleSubmit} initialValues={data && {
            primer_nombre: data.primer_nombre,
            segundo_nombre: data.segundo_nombre,
            primer_apellido: data.primer_apellido,
            segundo_apellido: data.segundo_apellido,
            id_area: data.id_area,
            id_rol_usuario: data.id_rol_usuario,
            estado: parseInt(data.estado) === 1 ? true : false
        }}>
            <div className='flex-start flex-wrap gap-5'>
                <Form.Item label='Rol' name='id_rol_usuario' rules={[{ required: true, message: 'Ingrese Rol' }]}>
                    <Select placeholder='Seleccione rol    '>
                        {roles.map((opt) => (
                            <Select.Option value={opt.id_rol_usuario}>
                                {opt.rol}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label='Primer nombre' name='primer_nombre' rules={[{ required: true, message: 'Ingrese Primer nombre' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label='Segundo nombre' name='segundo_nombre'>
                    <Input />
                </Form.Item>

                <Form.Item label='Primer apellido' name='primer_apellido' rules={[{ required: true, message: 'Ingrese Primer apellido' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Segundo apellido' name='segundo_apellido' rules={[{ required: true, message: 'Ingrese Segundo apaellido' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label='Area' name='id_area' rules={[{ required: true, message: '' }]}>
                    <Select placeholder='Seleccione rol    '>
                        {area.map((opt) => (
                            <Select.Option value={opt.id_area}>
                                {opt.nombre_area}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {data &&
                    <Form.Item label='Estado' name='estado' rules={[{ required: true, message: 'Ingrese Segundo apaellido' }]}>
                        <Switch />
                    </Form.Item>
                }

            </div>
            <div className='flex-end'>
                <Button className='button-submit' type='default' htmlType='submit'> Guardar</Button>

            </div>
        </Form>
    )
}
