import { createContext, useState } from "react";
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState(null);
  const [post, setPost] = useState(null);

  return (
    <PostContext.Provider
      value={{ loading, setLoading, post, setPost, feed, setFeed }}
    >
      {children}
    </PostContext.Provider>
  );
};
