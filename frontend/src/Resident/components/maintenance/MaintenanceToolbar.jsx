import { FaSearch, FaDownload } from "react-icons/fa";

function MaintenanceToolbar({ filters, onFilterChange }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* Search */}

        <div className="relative w-full lg:w-80">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search bills..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-3">

          <select value={filters.month} onChange={(e) => onFilterChange("month", e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Months</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>

          <select value={filters.status} onChange={(e) => onFilterChange("status", e.target.value)} className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>

          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition">

            <FaDownload />

            Download Receipts

          </button>

        </div>

      </div>

    </div>
  );
}

export default MaintenanceToolbar;