import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register(name, username, email, password) {
  try {
    const response = await api.post("/register", {
      name,
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function login(username, password) {
  try {
    const response = await api.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getMe() {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (error) {
    throw error;
  }
}
