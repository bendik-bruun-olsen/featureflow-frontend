import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Paths } from "../../paths";

export default function LoginPage() {
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (location.state?.email) {
      setLoginValues((prev) => ({
        ...prev,
        email: location.state.email,
      }));
    }
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location.state]);

  const postData = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(`${apiBaseUrl}/user/login`, {
				method: "POST",
				headers: { 
          "Content-Type": "application/json",
          },
				body: JSON.stringify(loginValues),
			});
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message)
      }
      localStorage.setItem("token", responseData.token);
      return true;
		} catch (err) {
			setError(err.message);
			console.error(err);
      return false;
		} finally {
			setIsLoading(false);
		}
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginSuccess = await postData();
    if (loginSuccess) {
      navigate(Paths.dashboard, { replace: true })
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center pt-5" style={{height: "100%"}}
    >
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h5 className="card-title text-center mb-3">Log in to Your Account</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
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
              onChange={(e) => setLoginValues({ ...loginValues, email: e.target.value})}
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
              onChange={(e) => setLoginValues({ ...loginValues, password: e.target.value})}
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