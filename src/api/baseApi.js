import api from './axiosConfig'

const BaseApi = {
  getAll: async (resource, params = {}) => {
    const { data } = await api.get(resource, { params })
    return data
  },

  getById: async (resource, id) => {
    const { data } = await api.get(`${resource}/${id}`)
    return data
  },

  create: async (resource, payload) => {
    const { data } = await api.post(resource, payload)
    return data
  },

  update: async (resource, id, payload) => {
    const { data } = await api.put(`${resource}/${id}`, payload)
    return data
  },

  remove: async (resource, id) => {
    const { data } = await api.delete(`${resource}/${id}`)
    return data
  },

  bulkUpdate: async (resource, payload) => {
    const { data } = await api.put(resource, payload)
    return data
  },

  upload: async (resource, formData) => {
    const { data } = await api.post(resource, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },
}

export default BaseApi
