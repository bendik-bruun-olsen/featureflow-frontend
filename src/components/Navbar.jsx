// import { Link } from "react-router-dom";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Paths } from "../paths";

export default function Navbar() {
    const navigate = useNavigate()
    const location = useLocation();
    const isAuthPage = location.pathname === Paths.login || location.pathname === Paths.signup

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate(Paths.login, { replace: true });
      };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                <Link className="navbar-brand" to={Paths.dashboard}>FeatureFlow</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {!isAuthPage && (
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                        <li className="nav-item">
              <a className="nav-link" href={Paths.dashboard}>Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={Paths.features}>Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={Paths.issues}>Issues</a>
            </li>
            </ul>
            <button
              className="btn btn-outline-light ms-auto"
              onClick={handleLogout}
            >
              Logout
            </button>

                    </div>
                    )}

                </div>
            </nav>
    )
}