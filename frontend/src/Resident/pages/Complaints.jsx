import { useState, useEffect } from "react";
import { getComplaints, deleteComplaint } from "../../services/complaintService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import ComplaintStats from "../components/complaints/ComplaintStats";
import ComplaintToolbar from "../components/complaints/ComplaintToolbar";
import ComplaintTable from "../components/complaints/ComplaintTable";
import RaiseComplaintModal from "../components/complaints/RaiseComplaintModal";
import ComplaintDetailsModal from "../components/complaints/ComplaintDetailsModal";
import ConfirmDialog from "../../components/ConfirmDialog";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", status: "All Status", priority: "All Priority" });
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null });

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (error) {
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter((complaint) => {
    const search = filters.search.toLowerCase();
    const matchesSearch = !search || [complaint.subject, complaint.category, complaint._id]
      .some((value) => String(value || "").toLowerCase().includes(search));
    return matchesSearch &&
      (filters.status === "All Status" || complaint.status === filters.status) &&
      (filters.priority === "All Priority" || complaint.priority === filters.priority);
  });

  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDetailsModal(true);
  };

  const handleEditComplaint = (complaint) => {
    if (complaint.status !== "Pending") {
      toast.warning("Only complaints with 'Pending' status can be modified.");
      return;
    }
    setEditingComplaint(complaint);
    setShowRaiseModal(true);
  };

  const handleDeleteComplaint = (id) => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: async () => {
        setConfirmDialog((d) => ({ ...d, isOpen: false }));
        try {
          await deleteComplaint(id);
          toast.success("Complaint deleted successfully");
          fetchComplaints();
        } catch (error) {
          toast.error("Failed to delete complaint");
        }
      },
    });
  };

  // Compute stats from live data
  const stats = {
    total: complaints.length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">My Complaints</h1>
        <p className="text-slate-500 mt-2">
          Raise, manage and track all your society complaints in real-time.
        </p>
      </div>

      {/* Stats */}
      <ComplaintStats stats={stats} />

      {/* Toolbar */}
      <div className="mt-8">
        <ComplaintToolbar
          filters={filters}
          onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
          onRaiseComplaint={() => {
            setEditingComplaint(null);
            setShowRaiseModal(true);
          }}
        />
      </div>

      {/* Complaint Table */}
      <div className="mt-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : (
          <ComplaintTable
            complaints={filteredComplaints}
            onViewComplaint={handleViewComplaint}
            onEditComplaint={handleEditComplaint}
            onDeleteComplaint={handleDeleteComplaint}
          />
        )}
      </div>

      {/* Raise / Edit Complaint Modal */}
      <RaiseComplaintModal
        isOpen={showRaiseModal}
        complaint={editingComplaint}
        onClose={() => {
          setShowRaiseModal(false);
          setEditingComplaint(null);
        }}
        onSuccess={() => {
          setShowRaiseModal(false);
          setEditingComplaint(null);
          fetchComplaints();
        }}
      />

      {/* Complaint Details Modal */}
      <ComplaintDetailsModal
        isOpen={showDetailsModal}
        complaint={selectedComplaint}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedComplaint(null);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Complaint"
        message="Are you sure you want to delete this complaint? This cannot be undone."
        confirmLabel="Delete"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((d) => ({ ...d, isOpen: false }))}
      />
    </>
  );
}

export default Complaints;