import { useState, useEffect } from "react";
import { getVisitors, deleteVisitor } from "../../services/visitorService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import VisitorStats from "../components/visitors/VisitorStats";
import VisitorToolbar from "../components/visitors/VisitorToolbar";
import VisitorTable from "../components/visitors/VisitorTable";
import InviteVisitorModal from "../components/visitors/InviteVisitorModal";
import QRPassModal from "../components/visitors/QRPassModal";
import ConfirmDialog from "../../components/ConfirmDialog";

function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null });

  const [filters, setFilters] = useState({ search: "" });
  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const data = await getVisitors();
      setVisitors(data);
    } catch (error) {
      toast.error("Failed to load visitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const filteredVisitors = visitors.filter((visitor) => {
    const search = filters.search.toLowerCase();
    return !search || [visitor.name, visitor.phone, visitor.purpose]
      .some((value) => String(value || "").toLowerCase().includes(search));
  });

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: async () => {
        setConfirmDialog((d) => ({ ...d, isOpen: false }));
        try {
          await deleteVisitor(id);
          toast.success("Visitor invite cancelled");
          fetchVisitors();
        } catch (error) {
          toast.error("Failed to cancel invite");
        }
      },
    });
  };

  const handleShowQR = (visitor) => {
    setSelectedVisitor(visitor);
    setShowQRModal(true);
  };

  // Compute stats from live data
  const stats = {
    total: visitors.length,
    checkedIn: visitors.filter((v) => v.status === "Checked In").length,
    checkedOut: visitors.filter((v) => v.status === "Checked Out").length,
    expected: visitors.filter((v) => v.status === "Expected").length,
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">My Visitors</h1>
        <p className="text-slate-500 mt-2">
          Manage visitor requests and generate visitor QR passes.
        </p>
      </div>

      {/* Stats */}
      <VisitorStats stats={stats} />

      {/* Toolbar */}
      <div className="mt-8">
        <VisitorToolbar filters={filters} onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} onInviteVisitor={() => setShowInviteModal(true)} />
      </div>

      {/* Table */}
      <div className="mt-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : (
          <VisitorTable
            visitors={filteredVisitors}
            onShowQR={handleShowQR}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Invite Visitor Modal */}
      <InviteVisitorModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSuccess={() => {
          setShowInviteModal(false);
          fetchVisitors();
        }}
      />

      {/* QR Pass Modal */}
      <QRPassModal
        isOpen={showQRModal}
        visitor={selectedVisitor}
        onClose={() => setShowQRModal(false)}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Cancel Visitor Invite"
        message="Are you sure you want to cancel this visitor invite?"
        confirmLabel="Cancel Invite"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((d) => ({ ...d, isOpen: false }))}
      />
    </>
  );
}

export default Visitors;