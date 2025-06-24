import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const apiClient = axios.create({
      baseURL: backendUrl,
});

apiClient.interceptors.request.use(config => {
      const userData = JSON.parse(localStorage.getItem('isLoggedIn'))
      const email = userData['email'];
      const password = userData['password']
      const role = userData['role']

      if(email && password && role){
            config.headers['email'] = email
            config.headers['password'] = password
            config.headers['role'] = role
      }
      return config
})

export { backendUrl, apiClient};