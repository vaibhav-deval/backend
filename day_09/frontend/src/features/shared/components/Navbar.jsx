import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (  
    <nav className="navbar">
      <p>insta</p>
      <button onClick={() => navigate("/create-post")} className="button">
        new post
      </button>
    </nav>
  );
};
 
export default Navbar;
