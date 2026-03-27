import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";

const Login = () => {
  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form>
          <FormGroup label={"Email"} placeholder={"Enter Your Email"} />
          <FormGroup label={"Password"} placeholder={"Enter Your Password"} />

          <button className="button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
