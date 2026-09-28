import {
  FaSearch,
  FaPlus,
  FaFilter,
} from "react-icons/fa";

function PollToolbar({ filters, onFilterChange, onCreatePoll }) {
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
              placeholder="Search poll..."
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          {/* Status */}

          <select value={filters.status} onChange={(e) => onFilterChange("status", e.target.value)} className="px-5 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none">

            <option>All Status</option>
            <option>Active</option>
            <option>Completed</option>
            <option>Scheduled</option>

          </select>

          {/* Category */}

          <select value={filters.category} onChange={(e) => onFilterChange("category", e.target.value)} className="px-5 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none">

            <option>All Categories</option>
            <option>Maintenance</option>
            <option>Events</option>
            <option>Security</option>
            <option>General</option>

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
            onClick={onCreatePoll}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 transition"
          >
            <FaPlus />
            Create Poll
          </button>

        </div>

      </div>

    </div>
  );
}

export default PollToolbar;