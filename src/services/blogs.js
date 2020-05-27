import axios from 'axios'
const baseUrl = process.env.REACT_APP_DEV_API + '/api/blogs' || '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

// TODO add restriction to API based on token in header
const getAll = async () => {
  const response = axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const destroy = async id => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

export default { getAll, setToken, create, update, destroy }