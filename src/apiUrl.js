let apiUrl
const apiUrls = {
	production: 'https://vast-tundra-01728.herokuapp.com',
	development: 'http://localhost:3000'
	// development: 'https://vast-tundra-01728.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export default apiUrl
