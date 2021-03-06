import axios from 'axios'
const baseUrl = '/api/persons'

export const getPeople = () => {
  return axios.get(baseUrl)
}

export const createPerson = newObject => {
  return axios.post(baseUrl, newObject)
}

export const updatePerson = (id, newObject) => {
  return axios.patch(`${baseUrl}/${id}`, newObject)
}

export const removePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}
