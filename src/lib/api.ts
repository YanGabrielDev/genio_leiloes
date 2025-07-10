import axios, { AxiosInstance, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
// Adicione esta linha para importar sua função de logout

export const api: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    const { response, request, message } = error

    if (response) {
      console.error('Erro de resposta:', response.data)

      // Adicione esta verificação para erro 401
      if (response.status === 401) {
        Cookies.remove('accessToken')
        localStorage.clear()
        window.location.href = '/'
      }
    } else if (request) {
      console.error('Erro de requisição:', request)
    } else {
      console.error('Erro:', message)
    }
    return Promise.reject(error)
  }
)
