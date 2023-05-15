import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Router>
    <Auth0Provider
      domain="dev-5oisd5che2fwlmjr.us.auth0.com"
      clientId="fgMh6snjBZrU7plF1lyLslo85xHXOeIE"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>,
  </Router>,
  document.getElementById('root')
);
