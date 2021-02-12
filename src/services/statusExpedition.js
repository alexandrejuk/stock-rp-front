import axiosInstance from '../helpers/request'

export const addStatusExpedition = (values) => {
  return axiosInstance
    .post('/statusExpedition', values, {})
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}

export const getAllStatusExpedition = (query) => {
  return axiosInstance
    .get('/statusExpedition', { params: { query } })
    .then((resp) => resp)
    .catch((error) => {
      throw new Error(error)
    })
}
