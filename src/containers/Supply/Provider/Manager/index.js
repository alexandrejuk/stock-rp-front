import React from 'react'
import { Button, Col, DatePicker, Form, Input, Row, Table, Typography } from 'antd'
import {
  EditTwoTone,
  SearchOutlined,
} from '@ant-design/icons'

const { Title } = Typography
const { RangePicker } = DatePicker;

const columns = ({ handleOnClickEdit }) => [
  {
    dataIndex: 'razaoSocial',
    title: 'Razão Social/Nome',
  },
  {
    dataIndex: 'cnpj',
    title: 'Cnpj/Cpf',
  },
  {
    dataIndex: 'createdAt',
    title: 'Data Inclusão',
  },
  {
    dataIndex: 'delete',
    render: (_, row) => (
      <Row>
        <Col span={12}>
          <EditTwoTone
            onClick={() => handleOnClickEdit(row)}
            style={{ fontSize: 18 }}
          />
        </Col>
      </Row>
    ),
  },
]

const ManageProviderSupply = ({
  dataSource,
  handleOnChangeTable,
  handleOnClickCloseSearchForm,
  handleOnClickEdit,
  handleOnClickOpenSearchForm,
  handleOnClickNewProvider,
  handleOnSearch,
  pagination,
  visibleSearch,
}) => (
  <>
    <Row justify="center">
      <Col>
        <Title level={3}>Gerenciar Fornecedor (Suprimentos)</Title>
      </Col>
    </Row>

    <Row justify="end" gutter={[0, 10]}>
      <Col>
        {visibleSearch ? (
          <Button onClick={handleOnClickCloseSearchForm}>
            Ocultar
          </Button>
        ) : (
          <Button onClick={handleOnClickOpenSearchForm}>
            Filtrar
          </Button>
        )}
        <Button onClick={handleOnClickNewProvider} style={{marginLeft: '5px'}}>
          Cadastrar novo fornecedor
        </Button>
      </Col>
    </Row>

    {visibleSearch && (
      <Form onFinish={handleOnSearch}>
        <Row gutter={20}>
          <Col span={10}>
            <Form.Item label="Razão Social" name="razaoSocial">
              <Input allowClear placeholder="Buscar por razão social" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Cnpj/Cpf" name="cnpj">
              <Input allowClear placeholder="Buscar por cnpj/cpf" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Data inclusão" name="createdAt">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button htmlType="submit" icon={<SearchOutlined />} type="primary" />
          </Col>
        </Row>
      </Form>
    )}

    <Table
      columns={columns({ handleOnClickEdit })}
      dataSource={dataSource}
      onChange={handleOnChangeTable}
      pagination={{ ...pagination, showSizeChanger: false }}
    />
  </>
)

export default ManageProviderSupply
