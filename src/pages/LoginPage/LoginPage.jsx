import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Paths } from "../../paths";
import usePost from "../../hooks/usePost";

export default function LoginPage() {
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { post, isLoading, error } = usePost();

  const handleLoginValuesChange = (e) => {
    const { name, value } = e.target;
    setLoginValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (location.state?.email) {
      setLoginValues((prev) => ({
        ...prev,
        email: location.state.email,
      }));
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await post(`${apiBaseUrl}/user/login`, loginValues);
      if (response) {
        console.log("Login result: ", response);
        localStorage.setItem("token", response.token);
        navigate(Paths.dashboard);
      }
    } catch (err) {
      console.error("An error happened logging in: ", err);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h5 className="card-title text-center mb-3">Log in to Your Account</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={loginValues.email}
              onChange={handleLoginValuesChange}
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
              value={loginValues.password}
              onChange={handleLoginValuesChange}
              placeholder="Enter your password"
              minLength={8}
              maxLength={255}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p>
            {"Don't have an account? "}
            <Link to={Paths.signup} className="text-primary">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}