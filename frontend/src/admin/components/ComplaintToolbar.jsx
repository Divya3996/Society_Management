import {
  FaPlus,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

function ComplaintToolbar({ filters, onFilterChange, onAddComplaint }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 mb-8">

      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

        {/* Search */}
        <div className="relative flex-1 max-w-lg">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search by Complaint ID, Resident or Flat..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Filters + Button */}
        <div className="flex flex-wrap gap-3">

          {/* Status */}
          <select value={filters.status} onChange={(e) => onFilterChange("status", e.target.value)} className="px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>

          {/* Category */}
          <select value={filters.category} onChange={(e) => onFilterChange("category", e.target.value)} className="px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Categories</option>
            <option>Water</option>
            <option>Electricity</option>
            <option>Parking</option>
            <option>Lift</option>
            <option>Security</option>
            <option>Cleaning</option>
            <option>Maintenance</option>
            <option>Others</option>
          </select>

          {/* Priority */}
          <select value={filters.priority} onChange={(e) => onFilterChange("priority", e.target.value)} className="px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none">
            <option>All Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition">

            <FaFilter />

            Filters

          </button>

          {/* Add Complaint */}
          <button
            onClick={onAddComplaint}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow hover:scale-105 transition"
          >

            <FaPlus />

            New Complaint

          </button>

        </div>

      </div>

    </div>
  );
}

export default ComplaintToolbar;