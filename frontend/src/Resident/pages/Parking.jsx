import { useState, useEffect } from "react";
import { deleteParking, getParkingSlots } from "../../services/parkingService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import ParkingStats from "../components/parking/ParkingStats";
import ParkingToolbar from "../components/parking/ParkingToolbar";
import ParkingTable from "../components/parking/ParkingTable";
import VehicleDetailsModal from "../components/parking/VehicleDetailsModal";
import AddVehicleModal from "../components/parking/AddVehicleModal";
import EditVehicleModal from "../components/parking/EditVehicleModal";

function Parking() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", vehicleType: "All Vehicle Types", slot: "All Slots" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

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
    return (!search || [slot.vehicleName, slot.vehicleNumber, slot.slotNumber].some((value) => String(value || "").toLowerCase().includes(search))) &&
      (filters.vehicleType === "All Vehicle Types" || slot.vehicleType === filters.vehicleType) &&
      (filters.slot === "All Slots" || String(slot.slotNumber || "").toLowerCase().startsWith(filters.slot.slice(0, 1).toLowerCase()));
  });

  const handleView = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetailsModal(true);
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteParking(id);
      toast.success("Parking request cancelled.");
      fetchSlots();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not cancel this parking request.");
    }
  };

  // Compute stats
  const stats = {
    total: slots.length,
    active: slots.filter(s => s.status === "Active").length,
    twoWheelers: slots.filter(s => ["Bike", "Scooter"].includes(s.vehicleType)).length,
    fourWheelers: slots.filter(s => s.vehicleType === "Car").length,
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">My Parking</h1>
        <p className="text-slate-500 mt-2">
          Manage your registered vehicles and assigned parking slots.
        </p>
      </div>

      {/* Stats */}
      <ParkingStats stats={stats} />

      {/* Toolbar */}
      <div className="mt-8">
        <ParkingToolbar filters={filters} onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} onAddVehicle={() => setShowAddModal(true)} />
      </div>

      {/* Table */}
      <div className="mt-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : (
          <ParkingTable
            slots={filteredSlots}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Modals */}
      <AddVehicleModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={() => {
          setShowAddModal(false);
          fetchSlots();
        }}
      />

      <EditVehicleModal
        isOpen={showEditModal}
        vehicle={selectedVehicle}
        onClose={() => setShowEditModal(false)}
        onSuccess={() => {
          setShowEditModal(false);
          fetchSlots();
        }}
      />

      <VehicleDetailsModal
        isOpen={showDetailsModal}
        vehicle={selectedVehicle}
        onClose={() => setShowDetailsModal(false)}
      />
    </>
  );
}

export default Parking;
