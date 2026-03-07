import { getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context.jsx";

export const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, post, setPost, feed, setFeed } = context;
  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      setFeed(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, post, feed, handleGetFeed };
};
