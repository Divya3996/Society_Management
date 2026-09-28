import { useState, useEffect } from "react";
import { getVisitors, deleteVisitor, updateVisitorStatus } from "../../services/visitorService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import VisitorStats from "../components/VisitorStats";
import VisitorToolbar from "../components/VisitorToolbar";
import VisitorTable from "../components/VisitorTable";
import QRPassModal from "../components/QRPassModal";
import QRPassPreview from "../components/QRPassPreview";
import ConfirmDialog from "../../components/ConfirmDialog";

function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", status: "All Visitors" });
  const [openQRModal, setOpenQRModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null });

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
    return (!search || [visitor.name, visitor.phone, visitor.flatNumber, visitor.resident?.name]
      .some((value) => String(value || "").toLowerCase().includes(search))) &&
      (filters.status === "All Visitors" || (filters.status === "QR Generated" ? Boolean(visitor.qrCode) : visitor.status === filters.status));
  });

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: async () => {
        setConfirmDialog((d) => ({ ...d, isOpen: false }));
        try {
          await deleteVisitor(id);
          toast.success("Visitor removed successfully");
          fetchVisitors();
        } catch (error) {
          toast.error("Failed to remove visitor");
        }
      },
    });
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateVisitorStatus(id, status);
      toast.success(`Visitor status updated to ${status}`);
      fetchVisitors();
    } catch (error) {
      toast.error("Failed to update visitor status");
    }
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
        <h1 className="text-4xl font-bold text-slate-800">Visitors</h1>
        <p className="mt-2 text-slate-500">
          Manage visitors and generate secure QR passes.
        </p>
      </div>

      {/* Statistics */}
      <VisitorStats stats={stats} />

      {/* Toolbar */}
      <VisitorToolbar filters={filters} onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} onGenerateQR={() => setOpenQRModal(true)} />

      {/* Visitor Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : (
        <VisitorTable
          visitors={filteredVisitors}
          onDelete={handleDelete}
          onUpdateStatus={handleUpdateStatus}
          onView={(visitor) => {
            setSelectedVisitor(visitor);
            setShowPreview(true);
          }}
        />
      )}

      {/* QR Modal */}
      <QRPassModal
        isOpen={openQRModal}
        onClose={() => setOpenQRModal(false)}
        onGenerate={(newVisitor) => {
          setOpenQRModal(false);
          setSelectedVisitor(newVisitor);
          setShowPreview(true);
          fetchVisitors();
        }}
      />

      {/* QR Preview */}
      {showPreview && (
        <QRPassPreview
          visitor={selectedVisitor}
          onClose={() => setShowPreview(false)}
        />
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Remove Visitor"
        message="Are you sure you want to remove this visitor record?"
        confirmLabel="Remove"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((d) => ({ ...d, isOpen: false }))}
      />
    </>
  );
}

export default Visitors;