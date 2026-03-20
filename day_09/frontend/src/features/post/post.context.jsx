import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState(null);
  const [post, setPost] = useState(null);
  const [following, setFollowing] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [following_length, setFollowing_length] = useState(following.length);
  const [suggestions_length, setSuggestions_length] = useState(
    suggestions.length,
  );

  return (
    <PostContext.Provider
      value={{
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
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
