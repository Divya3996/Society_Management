import { FaSearch, FaQrcode, FaFilter } from "react-icons/fa";

function VisitorToolbar({ filters, onFilterChange, onGenerateQR }) {
    return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mt-8">

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

        {/* Search Box */}
        <div className="relative w-full lg:flex-1">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search by Visitor Name, Flat or Phone..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

        </div>

        {/* Filter + QR Button */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          {/* Status Filter */}
          <div className="relative">

            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

            <select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="pl-10 pr-8 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option>All Visitors</option>
              <option>Checked In</option>
              <option>Checked Out</option>
              <option>Expected</option>
              <option>QR Generated</option>
            </select>

          </div>

          {/* Generate QR Button */}
          <button
  onClick={onGenerateQR}
  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-3 shadow-lg transition-all duration-300 hover:scale-105"
>
            <FaQrcode className="text-lg" />

            <span className="font-semibold">
              Generate QR Pass
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}

export default VisitorToolbar;