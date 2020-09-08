import React from "react";
import { useAuth0 } from "./auth/react-auth0-spa";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Spin, Icon } from "antd/es";
import NavBar from "./components/NavBar";
import Home from "./screens/Home";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import AddContact from "./screens/AddContact";
import ViewContact from "./screens/ViewContact";
import EditContact from "./screens/EditContact";

const App: React.FC = () => {
  const { loading, getTokenSilently, user } = useAuth0();

  if (loading) {
    return (
      <div className="App App-header">
        <Spin
          indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />}
        />
      </div>
    );
  }

  const client = new ApolloClient({
    uri: process.env.REACT_APP_API_URL,
    request: async (operation) => {
      try {
        const token = await getTokenSilently();
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : "",
          },
        });
      } catch (error) {}
    },
  });

  console.log(user);

  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add" component={AddContact} />
          <Route exact path="/view/:id" component={ViewContact} />
          <Route exact path="/edit/:id" component={EditContact} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
