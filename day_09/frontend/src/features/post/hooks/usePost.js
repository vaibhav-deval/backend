import {
  getFeed,
  createPost,
  likePost,
  unLikePost,
  getFollowing,
  getSuggestions,
  followUser,
  unFollowUser,
} from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context.jsx";
import { useNavigate } from "react-router-dom";

export const usePost = () => {
  const context = useContext(PostContext);
  const {
    loading,
    setLoading,
    post,
    setPost,
    feed,
    setFeed,
    following,
    setFollowing,
    suggestions,
    setSuggestions,
    following_length,
    setFollowing_length,
    suggestions_length,
    setSuggestions_length,
  } = context;

  const navigate = useNavigate();

  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      setFeed(data.reverse());
    } catch (error) {
      console.log(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (file, caption) => {
    try {
      setLoading(true);
      const data = await createPost(file, caption);
      setFeed([data.post, ...feed]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      setLoading(true);
      const data = await likePost(postId);
      handleGetFeed();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleUnLikePost = async (postId) => {
    try {
      setLoading(true);
      const data = await unLikePost(postId);
      handleGetFeed();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowing = async () => {
    try {
      setLoading(true);
      const data = await getFollowing();
      setFollowing(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSuggestion = async () => {
    try {
      setLoading(true);
      const data = await getSuggestions();
      setSuggestions(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    post,
    feed,
    following,
    suggestions,
    handleGetFeed,
    handleCreatePost,
    handleLikePost,
    handleUnLikePost,
    handleFollowing,
    handleSuggestion,
    followUser,
    unFollowUser,
    following_length,
    suggestions_length,
    setFollowing_length,
    setSuggestions_length,
  };
};
