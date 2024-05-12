import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  // const [number, setNumber] = useState(0);

  const [isAuthenticated, setAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  // async function login(username, password) {
  //   const baToken = "Basic " + window.btoa(username + ":" + password);
  //   try {
  //     const response = await executeBasicAuthenticationService(baToken);

  //     if (response.status == 200) {
  //       setAuthenticated(true);
  //       setUsername(username);
  //       setToken(baToken);
  //       apiClient.interceptors.request.use((config) => {
  //         console.log("interceptiong and adding a token");
  //         config.headers.Authorization = baToken;
  //         return config;
  //       });
  //       return true;
  //     } else {
  //       setAuthenticated(false);
  //       setNumber(null);
  //       setToken(null);
  //       return false;
  //     }
  //   } catch (error) {
  //     setAuthenticated(false);
  //     setNumber(null);
  //     setToken(null);
  //     return false;
  //   }
  // }

  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );

      if (response.status == 200) {
        const jwtToken = "Bearer " + response.data.token;
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);
        apiClient.interceptors.request.use((config) => {
          console.log("interceptiong and adding a token");
          config.headers.Authorization = jwtToken;
          return config;
        });
        return true;
      } else {
        setAuthenticated(false);
        setNumber(null);
        setToken(null);
        return false;
      }
    } catch (error) {
      setAuthenticated(false);
      setNumber(null);
      setToken(null);
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
