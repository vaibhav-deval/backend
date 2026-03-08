import {
  getFeed,
  createPost,
  likePost,
  unLikePost,
} from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context.jsx";

export const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, post, setPost, feed, setFeed } = context;
  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      setFeed(data.reverse());
    } catch (error) {
      console.log(error);
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

  // useEffect(() => {
  //   handleGetFeed();
  // }, []);

  return {
    loading,
    post,
    feed,
    handleGetFeed,
    handleCreatePost,
    handleLikePost,
    handleUnLikePost,
  };
};
