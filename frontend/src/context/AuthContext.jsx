import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("bookmarket_token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("bookmarket_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/auth/profile")
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem("bookmarket_user", JSON.stringify(data));
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [token]);

  const persist = (data) => {
    localStorage.setItem("bookmarket_token", data.token);
    localStorage.setItem("bookmarket_user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    persist(data);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    persist(data);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("bookmarket_token");
    localStorage.removeItem("bookmarket_user");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, loading, login, register, logout }), [token, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
