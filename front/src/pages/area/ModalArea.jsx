import { Button, Form, Input, Switch, message } from 'antd'
import React, { useRef, useEffect } from 'react'
import { httpAddOrUpdateArea } from '../../services/area-services';

export default function ModalArea({ data, onClose }) {


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
            id_area: data && data.id_area ? data.id_area : 0,
        }


        await httpAddOrUpdateArea(sendData).then((res) => {
            if (!res.err) {
                message.success(res.message);
            } else {
                message.error(res.message);
            }
        }).finally(() => onClose())

    }
    return (

        <Form layout='vertical' onFinish={handleSubmit} ref={formRef} initialValues={data && {
            estado: parseInt(data.estado) === 1 ? true : false,
            nombre_area: data.nombre_area,
        }}>
            <div className='flex-center flex-wrap gap-5'>
                <Form.Item label='Area' name='nombre_area'>
                    <Input />
                </Form.Item>

                {data && <Form.Item label='Estado' name='estado'>
                    <Switch />
                </Form.Item>}
            </div>
            <div className='flex-end'>
                <Button className='button-submit' type='default' htmlType='submit'> Guardar</Button>
            </div>
        </Form>
    )
}
