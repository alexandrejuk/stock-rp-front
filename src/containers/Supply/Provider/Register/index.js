import React from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { map } from 'ramda'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

import {
  validateCEP,
  validateCNPJ,
  validateEmail,
} from '../../../../utils/validators'
import masks, { applyMask } from '../../../../utils/masks'

const { Title } = Typography

const renderFormItem = (form) => ({ key, label, name, rules, span }) => (
  <Col key={key} span={span}>
    <Form.Item label={label} name={name} rules={rules}>
      <Input onChange={({ target: { value } }) => masks(form, name, value)} />
    </Form.Item>
  </Col>
)

const fieldsForm = (form) => [
  {
    key: 'cnpj',
    label: 'CNPJ',
    name: 'cnpj',
    rules: [
      { required: true },
      { validator: (_, value) => validateCNPJ(form, value) },
    ],
    span: 8,
  },
  {
    key: 'razaoSocial',
    label: 'Razão social',
    name: 'razaoSocial',
    rules: [{ required: true }],
    span: 16,
  },
  {
    key: 'zipCode',
    label: 'CEP',
    name: 'zipCode',
    rules: [
      { required: true },
      { validator: async (_, value) => await validateCEP(form, value) },
    ],
    span: 5,
  },
  {
    key: 'state',
    label: 'UF',
    name: 'state',
    rules: [{ required: true }, { len: 2 }],
    span: 3,
  },
  {
    key: 'city',
    label: 'Cidade',
    name: 'city',
    rules: [{ required: true }],
    span: 16,
  },
  {
    key: 'neighborhood',
    label: 'Bairro',
    name: 'neighborhood',
    rules: [{ required: true }],
    span: 8,
  },
  {
    key: 'street',
    label: 'Logradouro',
    name: 'street',
    rules: [{ required: true }],
    span: 12,
  },
  {
    key: 'number',
    label: 'Número',
    name: 'number',
    rules: [{ required: true }],
    span: 4,
  },
  {
    key: 'complement',
    label: 'Complemento',
    name: 'complement',
    rules: [],
    span: 12,
  },
  {
    key: 'referencePoint',
    label: 'Ponto de referência',
    name: 'referencePoint',
    rules: [],
    span: 12,
  },
]

const AddProviderSup = ({ form, handleSubmit }) => {
  return (
    <>
      <Row justify="center">
        <Col>
          <Title level={3}>Fornecedor Sup</Title>
        </Col>
      </Row>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        validateTrigger="onBlur"
      >
        <Row gutter={[20, 8]}>{map(renderFormItem(form), fieldsForm(form))}</Row>
        <Form.List
          initialValue={[{ name: '', email: '', telphone: '' }]}
          name="contacts"
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Row gutter={[20, 8]}>
                  <Col span={8}>
                    <Form.Item
                      {...field}
                      fieldKey={[field.fieldKey, 'name']}
                      label="Nome"
                      name={[field.name, 'name']}
                      rules={[
                        {
                          message: 'Nome do contato é obrigatório',
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...field}
                      fieldKey={[field.fieldKey, 'email']}
                      label="Email"
                      name={[field.name, 'email']}
                      rules={[
                        {
                          message: 'Email do contato é obrigatório',
                          required: true,
                        },
                        {
                          message: 'Formato de email incorreto',
                          validator: async (_, value) =>
                            await validateEmail(value),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={7}>
                    <Form.Item
                      {...field}
                      fieldKey={[field.fieldKey, 'telphone']}
                      label="Telefone"
                      name={[field.name, 'telphone']}
                      onChange={({ target: { value }}) => {
                        const contacts = form.getFieldValue('contacts')

                        contacts.splice(
                          field.name,
                          1,
                          {
                            ...contacts[field.name],
                            telphone: applyMask('telphone', value)
                          }
                        )
                        form.setFieldsValue({contacts})
                      }}
                      rules={[
                        {
                          message: 'Telefone do contato é obrigatório',
                          required: true,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  {fields.length > 1 && (
                    <Form.Item label={' '}>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Form.Item>
                  )}
                </Row>
              ))}
              <Form.Item>
                <Button onClick={() => add()} block icon={<PlusOutlined />}>
                  Adicionar
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Row justify="end">
          <Col>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Salvar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default AddProviderSup
