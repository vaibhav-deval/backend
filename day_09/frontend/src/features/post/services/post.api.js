import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function getFeed() {
  const response = await api.get("/posts/feed");
  return response.data.posts;
}

export async function createPost(file, caption) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("caption", caption);

  const response = await api.post("/posts", formData);
  return response.data;
}


export async function likePost(postId) {
  const response = await api.post(`/posts/like/${postId}`);
  return response.data;
}

export async function unLikePost(postId) {
  const response = await api.post(`/posts/unlike/${postId}`);
  return response.data;
}