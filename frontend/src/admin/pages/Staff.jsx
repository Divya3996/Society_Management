import { useState, useEffect } from "react";
import { getAllStaff, deleteStaff } from "../../services/staffService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import StaffStats from "../components/StaffStats";
import StaffToolbar from "../components/StaffToolbar";
import StaffTable from "../components/StaffTable";
import AddStaffModal from "../components/AddStaffModal";
import ConfirmDialog from "../../components/ConfirmDialog";

function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", department: "All Departments", status: "All Status" });
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null });

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const data = await getAllStaff();
      setStaff(data);
    } catch (error) {
      toast.error("Failed to load staff members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const filteredStaff = staff.filter((member) => {
    const search = filters.search.toLowerCase();
    return (!search || [member.name, member.phone, member.role].some((value) => String(value || "").toLowerCase().includes(search))) &&
      (filters.department === "All Departments" || (filters.department === "Security" ? member.role === "Security Guard" : filters.department === "Housekeeping" ? member.role === "Cleaner" : member.role === filters.department)) &&
      (filters.status === "All Status" || member.status === filters.status);
  });

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: async () => {
        setConfirmDialog((d) => ({ ...d, isOpen: false }));
        try {
          await deleteStaff(id);
          toast.success("Staff member removed");
          fetchStaff();
        } catch (error) {
          toast.error("Failed to remove staff member");
        }
      },
    });
  };

  const handleEdit = (member) => {
    setEditingStaff(member);
    setShowAddStaff(true);
  };

  // Compute stats from live data
  const stats = {
    total: staff.length,
    active: staff.filter((s) => s.status === "Active").length,
    security: staff.filter((s) => s.role === "Security Guard").length,
    housekeeping: staff.filter((s) => s.role === "Cleaner").length,
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Staff Management</h1>
        <p className="mt-2 text-slate-500">
          Add, manage, and track society staff members and their shifts.
        </p>
      </div>

      <StaffStats stats={stats} />

      <StaffToolbar
        filters={filters}
        onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
        onAddStaff={() => {
          setEditingStaff(null);
          setShowAddStaff(true);
        }}
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : (
        <StaffTable staff={filteredStaff} onDelete={handleDelete} onEdit={handleEdit} />
      )}

      <AddStaffModal
        isOpen={showAddStaff}
        onClose={() => {
          setShowAddStaff(false);
          setEditingStaff(null);
        }}
        staff={editingStaff}
        onSuccess={() => {
          setShowAddStaff(false);
          setEditingStaff(null);
          fetchStaff();
        }}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Remove Staff Member"
        message="Are you sure you want to remove this staff member from the system?"
        confirmLabel="Remove"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((d) => ({ ...d, isOpen: false }))}
      />
    </>
  );
}

export default Staff;