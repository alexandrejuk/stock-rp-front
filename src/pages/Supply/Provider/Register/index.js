import React from 'react'
import { Form, message } from 'antd'

import AddProviderSupContainer from '../../../../containers/Supply/Provider/Register'
import buildProvider from '../../../../utils/providerSpec'
import { NovoFornecedor } from '../../../../services/Suprimentos/fornecedor'

const messageErrorText = 'Erro ao cadastrar fornecedor'
const messageSuccessText = 'Fornecedor cadastrado com sucesso'

const AddProviderSup = () => {
  const [form] = Form.useForm()

  const handleSubmit = async (providerFormData) => {
    try {
      const { status } = await NovoFornecedor(buildProvider(providerFormData))

      if (status === 404 || status === 422 || status === 500) {
        throw new Error('422 Unprocessable Entity!')
      }

      form.resetFields()
      message.success(messageSuccessText)
    } catch (err) {
      message.error(messageErrorText)
    }
  }

  return <AddProviderSupContainer form={form} handleSubmit={handleSubmit} />
}

export default AddProviderSup
