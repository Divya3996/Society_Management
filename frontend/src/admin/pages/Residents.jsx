import { useState, useEffect } from "react";
import { getAllResidents, deleteUser, toggleUserStatus } from "../../services/userService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import ResidentStats from "../components/ResidentStats";
import ResidentToolbar from "../components/ResidentToolbar";
import ResidentTable from "../components/ResidentTable";
import AddResidentModal from "../components/AddResidentModal";
import ConfirmDialog from "../../components/ConfirmDialog";

function Residents() {
  const [showAddResident, setShowAddResident] = useState(false);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", wing: "All Wings", status: "All Status" });

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const fetchResidents = async () => {
    setLoading(true);
    try {
      const data = await getAllResidents();
      setResidents(data);
    } catch (error) {
      toast.error("Failed to load residents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  const filteredResidents = residents.filter((resident) => {
    const search = filters.search.toLowerCase();
    return (!search || [resident.name, resident.email, resident.phone, resident.flatNumber]
      .some((value) => String(value || "").toLowerCase().includes(search))) &&
      (filters.wing === "All Wings" || String(resident.flatNumber || "").toLowerCase().startsWith(filters.wing.slice(0, 1).toLowerCase())) &&
      (filters.status === "All Status" || resident.accountStatus === filters.status);
  });

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Resident",
      message:
        "Delete this resident only if they have no activity records. Residents with history should be deactivated to preserve society records.",
      confirmLabel: "Delete",
      onConfirm: async () => {
        setConfirmDialog((d) => ({ ...d, isOpen: false }));
        try {
          await deleteUser(id);
          toast.success("Resident deleted successfully");
          fetchResidents();
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to delete resident");
        }
      },
    });
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleUserStatus(id);
      toast.success("Resident status updated");
      fetchResidents();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Residents</h1>
        <p className="mt-2 text-slate-500">
          Manage all society residents, their flat details, and account status.
        </p>
      </div>

      <ResidentStats residents={residents} />

      <ResidentToolbar filters={filters} onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} onAddResident={() => setShowAddResident(true)} />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : (
        <ResidentTable
          residents={filteredResidents}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      )}

      <AddResidentModal
        isOpen={showAddResident}
        onClose={() => setShowAddResident(false)}
        onSuccess={() => {
          setShowAddResident(false);
          fetchResidents();
        }}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel || "Confirm"}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((d) => ({ ...d, isOpen: false }))}
      />
    </>
  );
}

export default Residents;
