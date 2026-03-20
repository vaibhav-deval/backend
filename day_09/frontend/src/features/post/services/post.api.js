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

export async function getFollowing() {
  const response = await api.get("/users/following");
  return response.data.following;
}

export async function getSuggestions() {
  const response = await api.get("/users/suggestions");
  return response.data.suggestions;
}

export async function followUser(username) {
  const response = await api.post(`/users/follow/${username}`);
  return response.data;
}
export async function unFollowUser(username) {
  const response = await api.post(`/users/unfollow/${username}`);
  return response.data;
}
