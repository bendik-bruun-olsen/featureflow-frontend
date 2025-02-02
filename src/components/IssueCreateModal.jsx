import { useState } from "react";

export default function IssueCreateModal({ show, onClose, onSuccess }) {
  const [data, setData] = useState({ title: "", description: "", severity: "medium" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData();
    if (!error) {
      setData({ title: "", description: "", severity: "medium" });
      onSuccess();
      onClose();
    }
  };

  const postData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unable to retrieve token. Please log in again");
      }
      const response = await fetch(`${apiBaseUrl}/issues/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Unable to create issue");
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Issue</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && <div className="alert alert-danger">Error: {error}</div>}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  required
                  maxLength={255}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="6"
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  maxLength={1000}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="severity" className="form-label">
                  Severity
                </label>
                <select
                  id="severity"
                  className="form-select"
                  value={data.severity}
                  onChange={(e) => setData({ ...data, severity: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}