import React, { useEffect, useState, useCallback } from 'react'
import { Form, message } from 'antd'
import { compose } from 'ramda'
import { withRouter } from 'react-router-dom'

import { buildProduct, buildProductUpdate } from '../../../utils/productSpec'
import EditProductContainer from '../../../containers/Product/Edit'
import {
  getAllProductType,
  getMarca,
  getProductById,
  updateProduto,
} from '../../../services/produto'

const success = () => message.success('Produto foi atualizado')
const errorMessage = () => message.error('Houve um erro ao atualizar produto')

const EditProduct = ({ history, match }) => {
  const [form] = Form.useForm()
  const [marksList, setMarkList] = useState([])
  const [typesList, setTypesList] = useState([])

  const getAllMarca = useCallback(async () => {
    try {
      const {
        data: { rows },
        status,
      } = await getMarca({ total: null })
      if (status === 404 || status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }
      setMarkList(rows)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getAllTipo = useCallback(async () => {
    try {
      const { data, status } = await getAllProductType()
      if (status === 404 || status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }
      setTypesList(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    const { id } = match.params

    getProductById(id).then(({ data }) => {
      form.setFieldsValue(buildProductUpdate(data))
    })

    getAllMarca()
    getAllTipo()
  }, [form, getAllMarca, getAllTipo, match])

  const handleSubmit = async (formData) => {
    try {
      const { id } = match.params

      await updateProduto(buildProduct({ ...formData, id }))
      history.push('/logged/product/manager')
      success()
    } catch (error) {
      errorMessage()
    }
  }

  return (
    <EditProductContainer
      form={form}
      handleSubmit={handleSubmit}
      marksList={marksList}
      typesList={typesList}
    />
  )
}

const enhanced = compose(withRouter)

export default enhanced(EditProduct)
