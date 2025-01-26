import { useEffect, useState } from "react";
import FeatureRequestCreateModal from "../../components/FeatureRequestCreateModal";
import VotingComponent from "../../components/VotingComponent";
import { capitalizeEachWord } from "../../utils";

export default function FeatureRequestsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [sortMethod, setSortMethod] = useState("top");
  const [filterStatus, setFilterStatus] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unable to retrieve token");
      }
      const response = await fetch(`${apiBaseUrl}/feature-request`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Unable to retrieve data");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleSuccess = () => {
    console.log("New Feature Request Created:");
  };

  const getSortedData = () => {
    let sortedData = [...data];

    if (sortMethod === "top") {
      sortedData.sort((a, b) => b.voteCount - a.voteCount);
    } else if (sortMethod === "new") {
      sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (filterStatus) {
      sortedData = sortedData.filter((item) => item.status === filterStatus);
    }

    return sortedData;
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">Error: {error}</div>}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Feature Requests</h1>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3 gap-3">
        <div className="d-flex">
        <button
          className={`btn ${sortMethod === "top" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSortMethod("top")}
        >
          Top
        </button>
        <button
          className={`btn ${sortMethod === "new" ? "btn-primary" : "btn-outline-primary"} ms-1`}
          onClick={() => setSortMethod("new")}
        >
          New
        </button>
        <select
          className="form-select w-auto ms-4"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleModalOpen}>
          Request Feature
        </button>
        </div>
      <div className="feature-requests-list">
        {getSortedData().length === 0 ? (
          <p>No feature requests yet.</p>
        ) : (
          getSortedData().map((featureRequest) => (
            <div key={featureRequest.id} className="card mb-3">
              <div className="card-body py-0">
                <div className="row">
                  <div className="col-auto d-flex align-items-center">
                    <VotingComponent
                      featureId={featureRequest.id}
                      initialVoteCount={featureRequest.voteCount || 0}
                      userVote={featureRequest.userVote || 0}
                    />
                  </div>
                  <div className="col d-flex flex-column justify-content-between py-2">
                    <h4 className="card-title pt-2">{featureRequest.title}</h4>
                    <div className="d-flex justify-content-between pt-2">
                      <p className="card-text text-muted mb-0">
                        Requested by: {capitalizeEachWord(featureRequest.createdByName)}
                      </p>
                      <p className="card-text text-muted mb-0">
                        Created: {new Date(featureRequest.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="col-auto d-flex align-items-center">
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