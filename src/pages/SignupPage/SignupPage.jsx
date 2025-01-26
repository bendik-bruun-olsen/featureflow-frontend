import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
// import usePost from "../../hooks/usePost";

export default function SignupPage() {
  const [signupValues, setSignupValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // const handleSignupValuesChange = (e) => {
  //   const { name, value } = e.target;
  //   setSignupValues((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const postData = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(`${apiBaseUrl}/user/create`, {
				method: "POST",
				headers: { 
          "Content-Type": "application/json",
          },
				body: JSON.stringify(signupValues),
			});
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message)
      }
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
    const SignUpSuccess = await postData();
    if (SignUpSuccess) {
      navigate(Paths.login, { replace: true, state: { email:signupValues.email, message: "Account created! You can now log in." }})
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center pt-5" style={{height: "100%"}}
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
              onChange={(e) => setSignupValues({ ...signupValues, username: e.target.value})}
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
              onChange={(e) => setSignupValues({ ...signupValues, email: e.target.value})}
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
              onChange={(e) => setSignupValues({ ...signupValues, password: e.target.value})}
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