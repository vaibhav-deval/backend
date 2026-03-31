import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";
import "../styles/navbar.scss";

const Navbar = () => {
  const { user, handelLogout } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.username || user?.email?.split("@")[0] || "Guest";

  const handleLogout = async () => {
    await handelLogout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="brand">
        <div className="logoContainer">
          <img
            src="https://ik.imagekit.io/threefree/MOODIFY%20music%20app%20lo.png"
            alt="Moodify Logo"
          />
        </div>
        <span>Moodify</span>
      </div>

      <div className="rightSection">
        <div className="userContainer">
          <div className="avatar" title={displayName}>
            <img
              src="https://ik.imagekit.io/threefree/pro.jpg?updatedAt=1771870746066"
              alt={displayName}
            />
          </div>
          <div className="userInfo">
            <span className="userName">{displayName}</span>
            <span className="userStatus">Online</span>
          </div>
        </div>

        <button className="logoutBtn" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
