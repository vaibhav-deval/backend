import { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Navbar from "../../shared/components/Navbar";

const Feed = () => {
  const { feed, handleGetFeed, loading, handleLikePost, handleUnLikePost } =
    usePost();
  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) return <h1>Loading...</h1>;

  return (
    <div className="main">
      <div className="feed_page">
        <Navbar />
        <div className="feed">
          <div className="posts">
            {feed.map((post) => {
              return <Post loading={loading} handleLikePost={handleLikePost} handleUnLikePost={handleUnLikePost} key={post._id} post={post} user={post.user} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
