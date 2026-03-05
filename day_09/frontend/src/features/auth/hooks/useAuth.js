import { AuthContext } from "../auth.context.jsx";
import { useContext } from "react";
import { login, register, getMe } from "../services/auth.api.js";

export function useAuth() {

  const { user, loading, setLoading, setUser } = useContext(AuthContext);
  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await login(username, password);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name, username, email, password) => {
    setLoading(true);
    try {
      const response = await register(name, username, email, password);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
  };
}
