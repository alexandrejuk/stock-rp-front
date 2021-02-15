import axiosInstance from '../../helpers/request'

export const NovoFornecedor = (values) => {
  return axiosInstance
    .post('/suprimentos/provider', values, {})
    .then((resp) => resp)
    .catch((error) => {
      throw new Error()
    })
}

export const UpdateProvider = (values) => {
  return axiosInstance
    .put('/suprimentos/provider', values, {})
    .then((resp) => resp)
    .catch((error) => {
      throw new Error()
    })
}

export const GetProvider = (query) => {
  return axiosInstance
    .get('/suprimentos/provider', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error()
    })
}


export const getProviderById = async (id) => {
  try { 
    const response = await axiosInstance.get(`/suprimentos/provider/${id}`)
    return response 
    } catch (error) {
    throw new Error(error)
  } 
}