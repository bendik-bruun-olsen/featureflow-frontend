import { useEffect, useState } from "react";
import IssueCreateModal from "../../components/IssueCreateModal";
import { capitalizeEachWord } from "../../utils";

export default function IssuePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unable to retrieve token");
      }
      const response = await fetch(`${apiBaseUrl}/issues`, {
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
      console.log("Result in IssuePage: ", result);
      
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
    console.log("New Issue Created");
    fetchData();
  };

  const getFilteredData = () => {
    let filteredData = [...data];

    if (filterStatus) {
      filteredData = filteredData.filter((item) => item.status === filterStatus);
    }

    if (filterSeverity) {
      filteredData = filteredData.filter((item) => item.severity === filterSeverity);
    }

    return filteredData;
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">Error: {error}</div>}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Issues</h1>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2 gap-3">
        <div className="d-flex">
          <select
            className="form-select w-auto me-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            className="form-select w-auto"
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
          >
            <option value="">All Severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleModalOpen}>
          Create Issue
        </button>
      </div>
      <div className="issues-list">
        {getFilteredData().length === 0 ? (
          <p>No issues yet.</p>
        ) : (
          getFilteredData().map((issue) => (
            <div key={issue.id} className="card mb-3">
                <div className="card-body py-0">
                    <div className="row">
                    <div className="col d-flex flex-column justify-content-between py-2">
                        <h4 className="card-title pt-2">{issue.title}</h4>
                        <div className="d-flex justify-content-between pt-2">
                        <p className="card-text text-muted mb-0">
                            Reported by: {capitalizeEachWord(issue.createdByName)}
                        </p>
                        <p className="card-text text-muted mb-0">
                            Created: {new Date(issue.createdAt).toLocaleDateString()}
                        </p>
                        </div>
                    </div>
                    <div className="col-auto d-flex gap-2 align-items-center justify-content-center">
                        <span
                            className={`badge ${
                                issue.severity === "low"
                                ? "bg-success"
                                : issue.severity === "medium"
                                ? "bg-warning"
                                : issue.severity === "high"
                                ? "bg-danger"
                                : "bg-dark"
                            } fs-6 py-2 px-3`}
                            >
                            {capitalizeEachWord(issue.severity)}
                        </span>
                        <span
                            className={`badge ${
                                issue.status === "in progress"
                                ? "bg-warning"
                                : issue.status === "resolved"
                                ? "bg-success"
                                : "bg-secondary"
                            } fs-6 py-2 px-3`}
                            >
                            {capitalizeEachWord(issue.status)}
                        </span>

                    </div>
                    </div>
                </div>
            </div>
          ))
        )}
      </div>

      <IssueCreateModal
        show={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
}