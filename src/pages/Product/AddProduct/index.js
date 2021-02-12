import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, message } from 'antd';
import { compose } from 'ramda';

import {
  newProduto,
  getAllProductType,
  getMarca,
} from '../../../services/produto';
import AddProductContainer from '../../../containers/Product/AddProduct';
import { buildProduct } from '../../../utils/productSpec';

const success = () => message.success('O cadastro foi efetuado');
const errorMessage = () => message.error('O cadastro não foi efetuado');

const AddProduct = ({
  auth,
}) => {
  const [form] = Form.useForm();
  const [marksList, setMarkList] = useState([])
  const [typesList, setTypesList] = useState([])

  useEffect(() => {
    getAllMarca();
    getAllTipo();
  }, []);

  const getAllTipo = async () => {
    try {
      const { data, status } = await getAllProductType();
      if (status === 404 || status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }
      setTypesList(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllMarca = async () => {
    try {
      const { data, status } = await getMarca({});
      if (status === 404 || status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }
      setMarkList(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (formData) => {
    const { modulo } = auth
    try {
      await newProduto(buildProduct({...formData, modulo }));
      form.resetFields();
      await success();
    } catch (error) {
      errorMessage();
    }
  }

  return (
    <AddProductContainer
      form={form}
      handleSubmit={handleSubmit}
      marksList={marksList}
      typesList={typesList}
    />
  );
}

const mapStateToProps = ({ auth }) => ({
  auth,
})

const enhanced = compose(
  connect(mapStateToProps),
);


export default enhanced(AddProduct);
