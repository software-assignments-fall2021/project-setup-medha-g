import React, { useState, useContext, createContext } from "react";
import axios from "axios";

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [errMessage, setMessage] = useState(null);

  const signin = (username, password, effect) => {
    axios
      .post("/api/users/login", {
        user: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
          setUser(res.data.user.username)
          return res.data.user.username;
        })
      .catch((error) => {
        setUser(false);
        setMessage(error.response.data.errors);
      });
    if (effect) effect();
  };

  const signup = (username, password, effect) => {
    // eslint-disable-next-line no-undef
    axios
      .post("/api/users/register", {
        user: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
          setUser(res.data.user.username)
          return res.data.user.username;
        })
      .catch((error) => {
        setUser(false);
        setMessage(error.response.data.errors);
      });
    if (effect) effect();
  };

  const signout = (effect) => {
    setUser(false);
    if (effect) effect();
  };

  return {
    user,
    signin,
    signup,
    signout,
    errMessage,
  };
};
