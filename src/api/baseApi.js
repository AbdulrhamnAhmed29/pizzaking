import api from './axiosConfig'

// global crud functions for all resources, using the configured axios instance 
const BaseApi = {
  getAll: async (resource, params) => {
    const {data} = await api.get(resource, params)
    return data
  },

  getById: async (resource, id, query = "") => {
    const queryString = query ? `?${query}` : "";
    const { data } = await api.get(`${resource}/${id}${queryString}`);
    return data;
  },

  create: async (resource, payload) => {
    const { data } = await api.post(resource, payload);
    return data
  },

  update: async (resource, id, payload) => {
    const { data } = await api.put(`${resource}/${id}`, payload);
    return data
  },

  remove: async (resource, id) => {
    const { data } = await api.delete(`${resource}/${id}`)
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
