import { useState } from "react";

export default function FeatureRequestCreateModal({ show, onClose, onSuccess }) {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitSuccess = await postData();
    if (!submitSuccess) return;
    setFormData({ title: "", description: "" })
    onSuccess();
    onClose();
    }

  const postData = async () => {
		setIsLoading(true);
		setError(null);
		try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Unable to retrieve token. Please log in again")
      }
			const response = await fetch(`${apiBaseUrl}/feature-request/create`, {
				method: "POST",
				headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
          },
				body: JSON.stringify(formData),
			});
      const responseData = await response.json()
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

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Request New Feature</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}/>
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
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  maxLength={1000}
                />
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