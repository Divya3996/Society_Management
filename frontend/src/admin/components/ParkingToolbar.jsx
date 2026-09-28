import {
  FaSearch,
  FaPlus,
  FaFilter,
} from "react-icons/fa";

function ParkingToolbar({ filters, onFilterChange, onAllocateParking }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">

      <div className="flex flex-col xl:flex-row gap-4 justify-between">

        {/* Left Side */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1">

          {/* Search */}
          <div className="relative flex-1">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search by Resident, Flat or Vehicle..."
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* Parking Type */}
          <select value={filters.type} onChange={(e) => onFilterChange("type", e.target.value)} className="px-5 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none">

            <option>All Parking</option>
            <option>Resident</option>
            <option>Visitor</option>

          </select>

          {/* Status */}
          <select value={filters.status} onChange={(e) => onFilterChange("status", e.target.value)} className="px-5 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none">

            <option>All Status</option>
            <option>Occupied</option>
            <option>Available</option>
            <option>Reserved</option>

          </select>

        </div>

        {/* Right Side */}
        <div className="flex gap-3">

          <button
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
          >
            <FaFilter />
            Filters
          </button>

          <button
            onClick={onAllocateParking}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 transition"
          >
            <FaPlus />
            Allocate Parking
          </button>

        </div>

      </div>

    </div>
  );
}

export default ParkingToolbar;