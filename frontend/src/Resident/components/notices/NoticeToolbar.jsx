import { FaSearch } from "react-icons/fa";

function NoticeToolbar({ filters, onFilterChange }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* Search */}

        <div className="relative w-full lg:w-96">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search notices..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-3">

          <select value={filters.category} onChange={(e) => onFilterChange("category", e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">

            <option>All Categories</option>

            <option>Maintenance</option>

            <option>Events</option>

            <option>Emergency</option>

            <option>General</option>

          </select>

          <select value={filters.priority} onChange={(e) => onFilterChange("priority", e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">

            <option>All Priority</option>

            <option>High</option>

            <option>Medium</option>

            <option>Low</option>

          </select>

        </div>

      </div>

    </div>
  );
}

export default NoticeToolbar;