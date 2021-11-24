import React, { useState, useContext, createContext, useEffect } from "react";
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
  const [jwt, setToken] = useState(null);
  const [errMessage, setMessage] = useState(null);

  const setJwt = (token) => {
    localStorage.setItem("jwt", token);
    setToken(token);
  }

  const signin = (username, password, effect) => {
    axios
      .post("/api/users/login", {
        user: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        setUser(res.data.user.username);
        setJwt(res.data.user.token);
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
        setUser(res.data.user.username);
        setJwt(res.data.user.token);
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
    setJwt(null);
    if (effect) effect();
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log("jwt token stored ", token);
    if (token && token !== "null") {
      axios.get('/api/users/current', {
        headers:
        {
          Authorization: `Token ${token}`
        }
      }).then((res) => {
        setUser(res.data.user.username);
        setJwt(res.data.user.token);
      }).catch((err) => {
        setUser(false);
        setJwt(null);
      })
    }
  }, [])

  return {
    user,
    jwt,
    setJwt,
    signin,
    signup,
    signout,
    errMessage
  };
};
