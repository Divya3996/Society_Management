import { useState, useEffect } from "react";
import { getParkingSlots, deleteParking } from "../../services/parkingService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import ParkingStats from "../components/ParkingStats";
import ParkingToolbar from "../components/ParkingToolbar";
import ParkingTable from "../components/ParkingTable";
import AllocateParkingModal from "../components/AllocateParkingModal";
import ConfirmDialog from "../../components/ConfirmDialog";

function Parking() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", type: "All Parking", status: "All Status" });
  const [showAllocateParking, setShowAllocateParking] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null });

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const data = await getParkingSlots();
      setSlots(data);
    } catch (error) {
      toast.error("Failed to load parking slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const filteredSlots = slots.filter((slot) => {
    const search = filters.search.toLowerCase();
    return (!search || [slot.resident?.name, slot.resident?.flatNumber, slot.vehicleNumber, slot.slotNumber]
      .some((value) => String(value || "").toLowerCase().includes(search))) &&
      (filters.type === "All Parking" || (filters.type === "Resident" ? Boolean(slot.resident) : !slot.resident)) &&
      (filters.status === "All Status" || (filters.status === "Occupied" ? slot.status === "Active" : slot.status !== "Active"));
  });

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: async () => {
        setConfirmDialog((d) => ({ ...d, isOpen: false }));
        try {
          await deleteParking(id);
          toast.success("Parking slot released");
          fetchSlots();
        } catch (error) {
          toast.error("Failed to release parking slot");
        }
      },
    });
  };

  const handleEdit = (slot) => {
    setEditingSlot(slot);
    setShowAllocateParking(true);
  };

  // Compute stats from live data
  const stats = {
    total: slots.length,
    occupied: slots.filter((s) => s.status === "Active").length,
    available: slots.filter((s) => s.status !== "Active").length,
    visitor: slots.filter((s) => ["Bike", "Scooter"].includes(s.vehicleType)).length,
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Parking Management</h1>
        <p className="mt-2 text-slate-500">
          Allocate, manage and monitor resident parking spaces with ease.
        </p>
      </div>

      {/* Statistics */}
      <ParkingStats stats={stats} />

      {/* Toolbar */}
        <ParkingToolbar
          filters={filters}
          onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
        onAllocateParking={() => {
          setEditingSlot(null);
          setShowAllocateParking(true);
        }}
      />

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : (
        <ParkingTable slots={filteredSlots} onDelete={handleDelete} onEdit={handleEdit} />
      )}

      {/* Modal */}
      <AllocateParkingModal
        isOpen={showAllocateParking}
        onClose={() => {
          setShowAllocateParking(false);
          setEditingSlot(null);
        }}
        slot={editingSlot}
        onSuccess={() => {
          setShowAllocateParking(false);
          setEditingSlot(null);
          fetchSlots();
        }}
      />

      {/* Confirm Release */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Release Parking Slot"
        message="Are you sure you want to release this parking slot? The resident will lose their allocated space."
        confirmLabel="Release"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((d) => ({ ...d, isOpen: false }))}
      />
    </>
  );
}

export default Parking;
