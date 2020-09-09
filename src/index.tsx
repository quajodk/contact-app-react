import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./auth/react-auth0-spa";

ReactDOM.render(
  <Auth0Provider
    domain="dev-tv04xmhk.us.auth0.com"
    client_id="aRCUPfswoLR6iGNDiNwtWHcZmJca4OIp"
    redirect_uri={window.location.origin}
    audience="https://dev-tv04xmhk.us.auth0.com/api/v2/"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
