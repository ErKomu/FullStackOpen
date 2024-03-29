import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
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

const update = async updatedObject => {
  const url = `${baseUrl}/${updatedObject.id}`
  const response = await axios.put(url, updatedObject)
  return response.data
}

const remove = async id => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(url, config)
  return response.data
}



export default { getAll, setToken, create, update, remove }