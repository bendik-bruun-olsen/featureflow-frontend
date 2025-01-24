import { useNavigate } from "react-router-dom"

export default function FeatureOverviewPage() {
    const navigate = useNavigate();

    const handleRequest = () => {
        navigate("/request-feature")
    }

    return (
        <>
        <h1>Feature overview page</h1>
        <button onClick={handleRequest} className="btn btn-primary">Request feature</button>
        </>
    )
}