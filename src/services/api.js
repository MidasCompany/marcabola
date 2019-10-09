import {create} from 'apisauce'

const tokens = {}

const api = create({
    baseURL : 'http://192.168.15.9:8080/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
    }
});

api.addResponseTransform((response) => {
    if (response.ok) {
      if (response.headers.authentication) {
        tokens.jwtToken = response.headers.authentication
      }
    }
  })

  api.addRequestTransform((request) => {
    if (tokens.jwtToken) {
      request.headers.Authentication = `Bearer ${tokens.jwtToken}`
    }
  })


export default api;