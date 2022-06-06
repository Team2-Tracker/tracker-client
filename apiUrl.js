let apiUrl
const apiUrls = {
  production: 'https://nameless-bastion-53048.herokuapp.com',
  development: 'http://localhost:4000'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl