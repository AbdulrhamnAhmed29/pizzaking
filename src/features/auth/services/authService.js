import api from '../../../api/axiosConfig'

const authService = {
  login: async (credentials) => {
    const { data } = await api.post('/auth/local', credentials)
    return data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}

export default authService