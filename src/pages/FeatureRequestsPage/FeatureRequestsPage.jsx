import { useEffect, useState } from "react";
import FeatureRequestCreateModal from "../../components/FeatureRequestCreateModal";
import VotingComponent from "../../components/VotingComponent";
import { capitalizeEachWord } from "../../utils"

export default function FeatureRequestsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async () => {
    console.log("Fetching");
    
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Unable to retrieve token")
      }
      const response = await fetch(`${apiBaseUrl}/feature-request`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      })
      if (!response.ok) {
        throw new Error("Unable to retrieve data")
      }
      const result = await response.json();
      setData(result);
      console.log("Result: ", result);
      
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleSuccess = () => {
    console.log("New Feature Request Created:");
  };

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">Error: {error}</div>}
      <h1>Feature Overview</h1>
      <button className="btn btn-primary mb-3" onClick={handleModalOpen}>
        Request Feature
      </button>
  
      <div className="feature-requests-list">
        {data.length === 0 ? (
          <p>No feature requests yet.</p>
        ) : (
          data.sort((a, b) => b.voteCount - a.voteCount).map((featureRequest) => (
            <div key={featureRequest.id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <VotingComponent
                      featureId={featureRequest.id}
                      initialVoteCount={featureRequest.voteCount || 0}
                      userVote={featureRequest.userVote || 0}
                    />
                  </div>
                  <div className="col">
                    <h4 className="card-title mb-3">{featureRequest.title}</h4>
                    <div className="d-flex justify-content-between">
                      <p className="card-text text-muted mb-0">
                        Requested by: {featureRequest.createdByName}
                      </p>
                      <p className="card-text text-muted mb-0">
                        Created: {new Date(featureRequest.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="col-auto">
                    <span
                      className={`badge ${
                        featureRequest.status === "in progress"
                          ? "bg-warning"
                          : featureRequest.status === "completed"
                          ? "bg-success"
                          : "bg-secondary"
                      } fs-6 py-2 px-3`}
                    >
                      {capitalizeEachWord(featureRequest.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <FeatureRequestCreateModal
        show={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
}