import {create} from 'apisauce';

const tokens = {};

const api = create({
  baseURL: 'http://marcabola.midasbr.com/',
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
