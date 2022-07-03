import { useState, useEffect, createContext, useContext } from "react";
import { api } from "src/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUserAuth = () => {
    const userAuth = localStorage.getItem("todoAppAuth");
    const userAuthObject = JSON.parse(userAuth);

    if (!userAuth) {
      setIsAuthenticated(false);
      return;
    }

    saveAndUpdateUserAuth(userAuthObject);
    setIsAuthenticated(true);
    api.defaults.headers.authorization = `Bearer ${userAuthObject.token}`;
  };

  const saveAndUpdateUserAuth = (userAuth) => {
    if (!userAuth) return;

    const { token, email } = userAuth;
    localStorage.setItem("todoAppAuth", JSON.stringify({ token, email }));

    setUserAuth(userAuth);
    setIsAuthenticated(true);
    api.defaults.headers.authorization = `Bearer ${token}`;
  };

  const deleteUserAuth = () => {
    localStorage.removeItem("todoAppAuth");

    setIsAuthenticated(false);
    setUserAuth({});
    api.defaults.headers.authorization = "";
  };

  useEffect(getUserAuth, []);

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        isAuthenticated,
        deleteUserAuth,
        saveAndUpdateUserAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
