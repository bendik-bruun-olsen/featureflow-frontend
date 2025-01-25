import { useState } from "react";
import FeatureRequestCreateModal from "../../components/FeatureRequestCreateModal";

export default function FeatureRequestsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleSuccess = (response) => {
    console.log("New Feature Request Created:", response);
    // Optionally, refresh the list of feature requests here
  };

  return (
    <div className="container mt-4">
      <h1>Feature Overview</h1>
      <button className="btn btn-primary" onClick={handleModalOpen}>
        Request Feature
      </button>

      {/* Modal */}
      <FeatureRequestCreateModal
        show={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
}