import React from 'react';
import {
  Button,
  Col,
  Input,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import {
  EditOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from '@ant-design/icons';
import { always, ifElse, pathEq } from 'ramda';
import PropTypes from 'prop-types';

import styles from './style.module.css';

const { Search } = Input;
const { Title } = Typography;

const customizedIcon = ifElse(
  pathEq(['customized'], true),
  always(<CheckCircleTwoTone twoToneColor="#52c41a" />),
  always(<CloseCircleTwoTone twoToneColor="#f01b0c" />),
);

const updateUserButton = goToUpdateUser => (_, user) => (
  <Tooltip placement="topLeft" title="Editar">
    <EditOutlined
      className="icon-edit"
      onClick={() => goToUpdateUser(user)}
      style={{ fontSize: '20px', color: '#08c' }}
      theme="outlined"
    />
  </Tooltip>
);

const columns = goToUpdateUser => ([{
  dataIndex: 'username',
  title: 'Usuário',
},
{
  dataIndex: 'typeName',
  title: 'Tipo de conta',
},
{
  dataIndex: 'customized',
  render: customized => customizedIcon({ customized }),
  title: 'Customizado',
},
{
  render: updateUserButton(goToUpdateUser),
  title: '',
}]);

const Manager = ({
  data,
  goToAddUser,
  goToUpdateUser,
  handlePaginations,
  handleSearch,
  loading,
}) => {
  return (
    <div className={styles.managerUserContainer}>
      <Row gutter={[8, 16]}>
        <Col span={24}>
          <Title level={3}>Gerenciar usuários</Title>
        </Col>
        <Col span={16} md={{ span: 18 }}>
          <Search
            placeholder="Filtre pelo nome do usuário"
            onSearch={handleSearch}
            allowClear
            enterButton="Pesquisar"
          />
        </Col>
        <Col span={8} md={{ span: 6 }}>
          <Button type="primary" onClick={goToAddUser}>
            Adicionar Usuário
          </Button>
        </Col>
        <Col span={24}>
          <Table
            loading={loading}
            columns={columns(goToUpdateUser)}
            dataSource={data}
            onChange={handlePaginations}
          />
        </Col>
      </Row>
    </div>
  );
};

Manager.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      typeName: PropTypes.string.isRequired,
      customized: PropTypes.bool.isRequired,
    }).isRequired,
  ),
  goToAddUser: PropTypes.func.isRequired,
  goToUpdateUser: PropTypes.func.isRequired,
  handlePaginations: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Manager;