import React from "react";
import { useAuth0 } from "../auth/react-auth0-spa";

import { PageHeader, Button } from 'antd/es';
import { Link } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <PageHeader
        ghost={false}
        title={<Link to="/">Contact Book App</Link>}
        extra={[
          !isAuthenticated && (
            <Button key="1" type="primary" onClick={() => loginWithRedirect({})}>Log in</Button>
          ),
          isAuthenticated && <Button key="2" type="danger" onClick={() => {
            localStorage.clear();
            logout({ returnTo: process.env.REACT_APP_REDIRECT_URL });
          }}>Log out</Button>,
        ]}
        avatar={{src: 'https://icon-library.net/images/android-contacts-icon-png/android-contacts-icon-png-22.jpg'}}
      >
      </PageHeader>
    </div>
  );
};

export default NavBar;