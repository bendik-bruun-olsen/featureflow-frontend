import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import usePost from "../../hooks/usePost";

export default function SignupPage() {
  const [signupValues, setSignupValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { post, isLoading, error } = usePost();

  const handleSignupValuesChange = (e) => {
    const { name, value } = e.target;
    setSignupValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await post(`${apiBaseUrl}/user/create`, signupValues);
      if (response) {
        console.log("Signup successful: ", response);
        navigate(Paths.login, { state: { email:signupValues.email }});
      }
    } catch (err) {
      console.error("Signup failed: ", err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h5 className="card-title text-center mb-3">Create a New Account</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={signupValues.username}
              onChange={handleSignupValuesChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={signupValues.email}
              onChange={handleSignupValuesChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={signupValues.password}
              onChange={handleSignupValuesChange}
              placeholder="Enter your password"
              minLength={8}
              maxLength={255}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}