import {create} from 'apisauce';

const tokens = {};

const api = create({
  baseURL: 'http://192.168.0.3:8080/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.addResponseTransform(response => {
  if (response.ok) {
    if (response.headers.authentication) {
      tokens.jwtToken = response.headers.authentication;
    }
  } else {
    throw response;
  }
});

api.addRequestTransform(request => {
  if (tokens.jwtToken) {
    request.headers.Authentication = `Bearer ${tokens.jwtToken}`;
  }
});

export default api;
