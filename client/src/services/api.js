import axios from 'axios'

const apiCodeBurger = axios.create({
  baseURL: 'https://code-burger-production.up.railway.app/'
})

apiCodeBurger.interceptors.request.use(async config => {
  const userData = await JSON.parse(localStorage.getItem('codeburger:userData'))
  const token = userData && userData.token
  config.headers.authorization = `Bearer ${token}`

  return config
})

export default apiCodeBurger
