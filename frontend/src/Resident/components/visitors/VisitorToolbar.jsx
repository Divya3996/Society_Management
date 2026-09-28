import { FaSearch, FaPlus, FaFilter } from "react-icons/fa";

function VisitorToolbar({ filters, onFilterChange, onInviteVisitor }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">

      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

        {/* Search Box */}
        <div className="relative w-full lg:w-96">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search visitor..."
                value={filters.search}
                onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Right Buttons */}
        <div className="flex gap-3">

          <button
            className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 hover:bg-slate-100 transition"
          >
            <FaFilter />

            Filter
          </button>

          <button
            onClick={onInviteVisitor}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <FaPlus />

            Invite Visitor
          </button>

        </div>

      </div>

    </div>
  );
}

export default VisitorToolbar;