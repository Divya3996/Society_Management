import { useState, useEffect } from "react";
import { getComplaints, deleteComplaint, updateComplaintStatus } from "../../services/complaintService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import ComplaintStats from "../components/ComplaintStats";
import ComplaintToolbar from "../components/ComplaintToolbar";
import ComplaintTable from "../components/ComplaintTable";
import ComplaintModal from "../components/ComplaintModal";
import ComplaintPreview from "../components/ComplaintPreview";
import ComplaintDetailsDrawer from "../components/ComplaintDetailsDrawer";
import ConfirmDialog from "../../components/ConfirmDialog";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", status: "All Status", category: "All Categories", priority: "All Priority" });

  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
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
    return (!search || [complaint._id, complaint.subject, complaint.resident?.name, complaint.resident?.flatNumber]
      .some((value) => String(value || "").toLowerCase().includes(search))) &&
      (filters.status === "All Status" || complaint.status === filters.status || (filters.status === "Open" && complaint.status === "Pending")) &&
      (filters.category === "All Categories" || complaint.category === filters.category) &&
      (filters.priority === "All Priority" || complaint.priority === filters.priority);
  });

  const handleEdit = (complaint) => {
    setEditingComplaint(complaint);
    setShowComplaintModal(true);
  };

  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDrawer(true);
  };

  const handleDelete = (id) => {
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

  const handleUpdateStatus = async (id, status, remarks) => {
    try {
      await updateComplaintStatus(id, status, remarks);
      toast.success("Complaint status updated");
      fetchComplaints();
      return true;
    } catch (error) {
      toast.error("Failed to update status");
      return false;
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Complaints</h1>
        <p className="mt-2 text-slate-500">Manage and track all resident complaints.</p>
      </div>

      <ComplaintStats complaints={complaints} />

      <ComplaintToolbar
        filters={filters}
        onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
        onAddComplaint={() => {
          setEditingComplaint(null);
          setShowComplaintModal(true);
        }}
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : (
        <ComplaintTable
          complaints={filteredComplaints}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showComplaintModal && (
        <ComplaintModal
          isOpen={showComplaintModal}
          onClose={() => {
            setShowComplaintModal(false);
            setEditingComplaint(null);
          }}
          mode={editingComplaint ? "edit" : "add"}
          complaint={editingComplaint}
          onSubmit={() => {
            setShowComplaintModal(false);
            fetchComplaints();
            if (!editingComplaint) setShowPreview(true);
            setEditingComplaint(null);
          }}
        />
      )}

      {showPreview && (
        <ComplaintPreview onClose={() => setShowPreview(false)} />
      )}

      {showDrawer && selectedComplaint && (
        <ComplaintDetailsDrawer
          isOpen={showDrawer}
          complaint={selectedComplaint}
          onClose={() => {
            setShowDrawer(false);
            setSelectedComplaint(null);
          }}
          onUpdateStatus={(status, remarks) =>
            handleUpdateStatus(selectedComplaint._id, status, remarks)
          }
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Complaint"
        message="Are you sure you want to delete this complaint? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((d) => ({ ...d, isOpen: false }))}
      />
    </>
  );
}

export default Complaints;
