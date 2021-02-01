import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Col, Form, Row, Table, Typography } from 'antd';

import ModalNewQuotation from '../../components/ModalNewQuotation';
import styles from './style.module.css';

const { Title } = Typography

const columns = [
  {
    title: 'Produtos',
    dataIndex: 'product',
  },
  {
    title: 'Quantidade',
    dataIndex: 'quant',
  },
  {
    title: 'Solicitante',
    dataIndex: 'solicitante',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Data',
    dataIndex: 'date',
  },
];

const Quotation = ({ data, handleOk }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onBlur = () => {
    console.log('blur');
  };

  const onFocus = () => {
    console.log('focus');
  };

  const onSearch = (val) => {
    console.log('search:', val);
  };

  return (
    <div>
      <Row justify="center">
        <Col>
          <Title level={3}>Cotação</Title>
        </Col>
      </Row>
      <div className={styles.divDireita}>
        <Button onClick={showModal}>
          Criar nova cotação
        </Button>
      </div>
      <ModalNewQuotation
        form={form}
        handleCancel={handleCancel}
        handleOk={handleOk}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onSearch={onSearch}
        visible={visible}
      />
      <Table columns={columns} dataSource={data} size="middle" />
    </div>
  );
};

export default Quotation;
