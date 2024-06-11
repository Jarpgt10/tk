import React, { useContext, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { AuthContext } from '../../context/authContext';
import { encryptPassword } from '../../utilties/cryptoUtils';
import { httpLogin } from '../../services/login-services';

export default function Login() {
    const { login } = useContext(AuthContext);
    const handleSubmit = (values) => {
        const dataSend = {
            ...values,
            contrasena: encryptPassword(values.contrasena),
        }

        httpLogin(dataSend).then((res) => {
            if (res && res['token'] && res['usuario']) {
                login(res['token'], res['usuario']);
            } else {
                message.error('Usuario/Contraseña incorrectos!')
            }
        })
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
            <div className="w-full max-w-sm p-8 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-200"> GEODAN </h2>
                <Form
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="usuario"
                        rules={[{ required: true, message: 'Por favor ingrese su usuario!' }]}
                    >
                        <Input placeholder="Usuario" />
                    </Form.Item>
                    <Form.Item
                        name="contrasena"
                        rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
                    >
                        <Input.Password placeholder="Contraseña" />
                    </Form.Item>

                    <Form.Item className="text-right">
                        <a href="#" className="text-sm text-gray-400 hover:underline">
                            Forgot Password?
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button className='bg-[#313b4b] w-full text-white hover:bg-[#313b4b6c]' ghost={true} type='default' htmlType="submit">
                            INICIAR
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );

}
