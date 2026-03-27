import { login, register, logout, getMe } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  async function handelRegister({ email, password, username }) {
    setLoading(true);
    const data = await register({ email, password, username });
    setUser(data.user);
    setLoading(false);
  }

  async function handelLogin({ email, password, username }) {
    setLoading(true);
    const data = await login({ email, password, username });
    setUser(data.user);
    setLoading(false);
  }

  async function handelGetMe() {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
    setLoading(false);
  }

  async function handeleLogout() {
    setLoading(true);
    const data = await logout();
    setUser(null);
    setLoading(false);
  }
};
