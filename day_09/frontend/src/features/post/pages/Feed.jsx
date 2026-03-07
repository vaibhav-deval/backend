import { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
const Feed = () => {
  const { feed, handleGetFeed, loading } = usePost();
  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) return <h1>Loading...</h1>;

  return (
    <div className="main">
      <div className="feed_page">
        <div className="feed">
          <div className="posts">
            {feed.map((post) => {
              return <Post key={post._id} post={post} user={post.user} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
