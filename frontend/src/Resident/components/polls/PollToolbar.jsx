import { FaSearch, FaFilter } from "react-icons/fa";

function PollToolbar({ filters, onFilterChange }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        {/* Search */}
        <div className="relative w-full md:max-w-md">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search polls..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Filter */}
        <div className="relative w-full md:w-52">

          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="All">All Polls</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>

        </div>

      </div>

    </div>
  );
}

export default PollToolbar;