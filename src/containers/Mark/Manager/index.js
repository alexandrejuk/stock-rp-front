import React from 'react'
import { Button, Col, Form, Input, Modal, Row, Table, Typography } from 'antd'

const { Search } = Input
const { Title } = Typography

const columns = [
  {
    dataIndex: 'mark',
    title: 'Marca',
  },
]

const ModalMark = ({ form, handleCancel, handleOK, visible }) => {
  return (
    <Modal
      onCancel={handleCancel}
      onOk={() => form.submit()}
      title="Adicionar Marca"
      visible={visible}
    >
      <Form form={form} onFinish={handleOK}>
        <Form.Item label="Marca" name="mark" rules={[{ required: true }]}>
          <Input placeholder="Insira a marca" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const Manager = ({
  dataSource,
  formCreateMark,
  handleCancelCreateMark,
  handleChangeTable,
  handleOkCreateMark,
  handleOnClickNewMark,
  handleOnSearch,
  pagination,
  visibleCreateMark,
}) => (
  <>
    <ModalMark
      form={formCreateMark}
      handleCancel={handleCancelCreateMark}
      handleOK={handleOkCreateMark}
      visible={visibleCreateMark}
    />

    <Row justify="center">
      <Col>
        <Title level={3}>Gerenciamento de marca</Title>
      </Col>
    </Row>

    <Row gutter={[10, 20]}>
      <Col flex="auto">
        <Search
          allowClear
          enterButton
          onSearch={handleOnSearch}
          placeholder="Pesquisar ..."
        />
      </Col>

      <Col flex="168px">
        <Button onClick={handleOnClickNewMark}>Adicionar nova marca</Button>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Table
          columns={columns}
          dataSource={dataSource}
          onChange={handleChangeTable}
          pagination={pagination}
        />
      </Col>
    </Row>
  </>
)

export default Manager
