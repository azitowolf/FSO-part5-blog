import axios from 'axios'
const baseUrl = process.env.REACT_APP_DEV_API || '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

// TODO add restriction to API based on token in header
const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, setToken, create }