import "../style/register.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handelRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    await handelRegister({ username, email, password });
    navigate("/");
  }
  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            label={"Username"}
            placeholder={"Enter Your Name"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormGroup
            label={"Email"}
            placeholder={"Enter Your Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormGroup
            label={"Password"}
            placeholder={"Enter Your Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" type="submit">
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
