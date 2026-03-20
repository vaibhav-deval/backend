import { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Navbar from "../../shared/components/Navbar";

const Feed = () => {
  const {
    feed,
    loading,
    following,
    suggestions,
    handleLikePost,
    handleGetFeed,
    handleUnLikePost,
    handleFollowing,
    handleSuggestion,
    followUser,
    unFollowUser,
    following_length,
    suggestions_length,
    setFollowing_length,
    setSuggestions_length,
  } = usePost();

  useEffect(() => {
    handleGetFeed();
    handleFollowing();
    handleSuggestion();
  }, []);
  useEffect(() => {
    handleFollowing();
    handleSuggestion();
  }, [following_length, suggestions_length]);

  if (loading || !feed) return <h1>Loading...</h1>;

  const users = (user, follow = true) => {
    return (
      <div className="user">
        <div className="proPic">
          <img src={user.profilePicture} />
        </div>
        <p key={user._id}>{user.username}</p>
        <button
          onClick={
            follow
              ? () => {
                  unFollowUser(user.username);
                  setFollowing_length(following_length - 1);
                }
              : () => {
                  followUser(user.username);
                  setSuggestions_length(suggestions_length - 1);
                }
          }
          className={follow ? "unfollowBtn" : "followBtn"}
        >
          {follow ? "unfollow" : "follow"}
        </button>
      </div>
    );
  };

  return (
    <div className="main">
      <div className="user_info">
        <div className="following">
          <h3>Following <span>{following_length}</span></h3>
          {following.map((user) => {
            return users(user);
          })}
        </div>
        <div className="suggestion">
          <h3>Suggestions</h3>
          {suggestions.map((user) => {
            return users(user, false);
          })}
        </div>
      </div>
      <div className="feed_page">
        <Navbar />
        <div className="feed">
          <div className="posts">
            {feed.map((post) => {
              return (
                <Post
                  loading={loading}
                  handleLikePost={handleLikePost}
                  handleUnLikePost={handleUnLikePost}
                  key={post._id}
                  post={post}
                  user={post.user}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
