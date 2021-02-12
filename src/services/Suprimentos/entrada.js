import axiosInstance from '../../helpers/request'

export const NovaEntrada = (values) => {
  return axiosInstance
    .post('/suprimentos/entrance', values, {})
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const GetEntrance = (query) => {
  return axiosInstance
    .get('/suprimentos/entrance', {
      params: { query },
    })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
