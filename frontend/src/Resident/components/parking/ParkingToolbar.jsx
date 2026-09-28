import { FaSearch, FaPlus } from "react-icons/fa";

function ParkingToolbar({ filters, onFilterChange, onAddVehicle }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* Search */}

        <div className="relative w-full lg:w-80">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search vehicle..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-3">

          <select value={filters.vehicleType} onChange={(e) => onFilterChange("vehicleType", e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Vehicle Types</option>
            <option>Car</option>
            <option>Bike</option>
            <option>Scooter</option>
          </select>

          <select value={filters.slot} onChange={(e) => onFilterChange("slot", e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Slots</option>
            <option>A Block</option>
            <option>B Block</option>
            <option>C Block</option>
          </select>

          <button
            onClick={onAddVehicle}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
          >
            <FaPlus />
            Add Vehicle
          </button>

        </div>

      </div>

    </div>
  );
}

export default ParkingToolbar;