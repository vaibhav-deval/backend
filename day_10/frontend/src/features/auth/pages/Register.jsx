import "../style/register.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";

const Register = () => {
  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <FormGroup label={"Name"} placeholder={"Enter Your Name"} />
          <FormGroup label={"Email"} placeholder={"Enter Your Email"} />
          <FormGroup label={"Password"} placeholder={"Enter Your Password"} />

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
