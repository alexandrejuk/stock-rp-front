import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Form, message } from 'antd';
import { compose, path } from 'ramda';
import PropTypes from 'prop-types';

import {
  getResourcesByTypeAccount,
  getTypeAccount,
  updateUsuario,
} from '../../../services/usuario';
import buildUser from '../../../utils/userSpec';
import EditUserContainer from '../../../containers/User/EditUser';
import PERMISSIONS from '../../../utils/permissions';

const createUserText = 'Usuário alterado com sucesso!'
const unableCreateUserText = 'Não foi possível alterar o usuário!'
const unableSetThatAccountType = 'Não foi possível pegar as permissões desse tipo de conta!'

const successMessage = messageText => message.success(messageText);
const errorMessage = messageText => message.error(messageText);

const EditUser = ({
  usuarioUpdateValue,
}) => {
  const [allowCustomPermissions, setAllowCustomPermissions] = useState(false);
  const [form] = Form.useForm();
  const [shouldRequest, setShouldRequest] = useState(true)
  const [typeAccounts, setTypeAccounts] = useState([])

  useEffect(() => {
    const handleSetForm = () => form.setFieldsValue({
      ...usuarioUpdateValue.resource,
      allowCustomPermissions: path(['customized'], usuarioUpdateValue),
      userName: path(['username'], usuarioUpdateValue),
      typeAccount: path(['typeName'], usuarioUpdateValue),
    })

    setAllowCustomPermissions(path(['customized'], usuarioUpdateValue))
    if (shouldRequest) {
      handleSetForm()
      getAllTypeAccount()
    }
  }, [
    form,
    shouldRequest,
    usuarioUpdateValue,
  ])

  const getAllTypeAccount = async () => {
    let responseStatus = null
    try {
      const query = {
        filters: {
          typeAccount: {
            specific: {
              stock: true
            }
          }
        }
      };

      const { data, status } = await getTypeAccount(query)
      responseStatus = status
      setTypeAccounts(data.rows)
      setShouldRequest(false)
    } catch (error) {
      setShouldRequest(false)
      console.log({ status: responseStatus, error })
    };
  };

  const handleAllowSetCustomPermissions = () => (
    setAllowCustomPermissions(!allowCustomPermissions)
  );

  const handleOnTypeAccountChange = async (typeAccount) => {
    try {
      const query = {
        filters: {
          typeAccount: {
            specific: {
              typeName: typeAccount
            }
          }
        }
      };

      const { data } = await getResourcesByTypeAccount(query)

      form.setFieldsValue({
        ...data,
        typeAccount,
      })
    } catch (error) {
      errorMessage(unableSetThatAccountType)
    }
  }

  const handleSubmit = async (formData) => {
    const userParser = {
      id: path(['id'], usuarioUpdateValue),
      ...buildUser(formData),
    };

    try {
      const { status } = await updateUsuario(userParser);

      if (status === 422 || status === 500) {
        throw new Error('Unprocessable Entity!')
      }
      successMessage(createUserText)
    } catch (error) {
      errorMessage(unableCreateUserText)
    }
  };

  return (
    <EditUserContainer
      allowCustomPermissions={allowCustomPermissions}
      form={form}
      handleAllowSetCustomPermissions={handleAllowSetCustomPermissions}
      handleOnTypeAccountChange={handleOnTypeAccountChange}
      handleSubmit={handleSubmit}
      permissions={PERMISSIONS}
      typeAccounts={typeAccounts}
    />
  )
}

const mapStateToProps = ({
  usuarioUpdateValue,
}) => ({
  usuarioUpdateValue
});

const enhanced = compose(
  connect(mapStateToProps),
  withRouter,
);

EditUser.propTypes = {
  usuarioUpdateValue: PropTypes.shape({
    customized: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    resource: PropTypes.shape({
      addAccessories: PropTypes.bool.isRequired,
      addAnalyze: PropTypes.bool.isRequired,
      addCar: PropTypes.bool.isRequired,
      addCompany: PropTypes.bool.isRequired,
      addEntr: PropTypes.bool.isRequired,
      addEntry: PropTypes.bool.isRequired,
      addEquip: PropTypes.bool.isRequired,
      addEquipType: PropTypes.bool.isRequired,
      addFonr: PropTypes.bool.isRequired,
      addKit: PropTypes.bool.isRequired,
      addKitOut: PropTypes.bool.isRequired,
      addMark: PropTypes.bool.isRequired,
      addOutPut: PropTypes.bool.isRequired,
      addPart: PropTypes.bool.isRequired,
      addProd: PropTypes.bool.isRequired,
      addRML: PropTypes.bool.isRequired,
      addROs: PropTypes.bool.isRequired,
      addStatus: PropTypes.bool.isRequired,
      addTec: PropTypes.bool.isRequired,
      addType: PropTypes.bool.isRequired,
      addTypeAccount: PropTypes.bool.isRequired,
      addUser: PropTypes.bool.isRequired,
      delROs: PropTypes.bool.isRequired,
      gerROs: PropTypes.bool.isRequired,
      modulo: PropTypes.bool.isRequired,
      suprimento: PropTypes.bool.isRequired,
      tecnico: PropTypes.bool.isRequired,
      updateRos: PropTypes.bool.isRequired,
    }).isRequired,
    typeName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default enhanced(EditUser);
