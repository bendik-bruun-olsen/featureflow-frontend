import { Link } from "react-router-dom";
import { Paths } from "../paths";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">FeatureFlow</Link>
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
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to={Paths.dashboard}>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={Paths.features}>Feature Requests</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={Paths.issues}>Reported Issues</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    )
}