import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from './use-auth';



const LogoutPage = () => {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <button className="column login-text logout-button" onClick={() => {
      auth.signout(() => history.push('/'));
    }}>
      Logout
    </button>
  ) : null;
}

export default LogoutPage