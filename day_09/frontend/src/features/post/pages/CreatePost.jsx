import "../style/createPost.scss";
import { useState, useRef } from "react";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef(null);
  const { handleCreatePost, loading } = usePost();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    await handleCreatePost(file, caption);
    navigate("/");
  }
  if (loading) return <h1>Creating Post...</h1>;
  return (
    <div className="main">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label className="postFileLabel" htmlFor="post">
            Upload Image
          </label>
          <input ref={fileInputRef} hidden type="file" id="post" name="post" />
          <label htmlFor="caption">Caption</label>
          <input
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            type="text"
            id="caption"
            name="caption"
          />
          <button className="button">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
