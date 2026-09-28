import {
  FaSearch,
  FaPlus,
  FaFilter,
} from "react-icons/fa";

function MaintenanceToolbar({ filters, onFilterChange, onGenerateBill }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 mb-8">

      {/* Top Row */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

        {/* Search */}
        <div className="relative flex-1">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search by Invoice, Resident, Flat..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Generate Bill Button */}
        <button
          onClick={onGenerateBill}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
        >
          <FaPlus />
          Generate Bill
        </button>

      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mt-6">

        {/* Month */}
        <select value={filters.month} onChange={(e) => onFilterChange("month", e.target.value)} className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">

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

        {/* Payment Status */}
        <select value={filters.status} onChange={(e) => onFilterChange("status", e.target.value)} className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">

          <option>Payment Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>

        </select>

        {/* Flat */}
        <select value={filters.flat} onChange={(e) => onFilterChange("flat", e.target.value)} className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">

          <option>All Flats</option>
          <option>A Wing</option>
          <option>B Wing</option>
          <option>C Wing</option>

        </select>

        {/* Payment Method */}
        <select value={filters.method} onChange={(e) => onFilterChange("method", e.target.value)} className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">

          <option>Payment Method</option>
          <option>PhonePe</option>
          <option>Google Pay</option>
          <option>Paytm</option>
          <option>Cash</option>
          <option>Bank Transfer</option>

        </select>

        {/* Reset */}
        <button
          className="border border-slate-300 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-slate-100 transition"
        >
          <FaFilter />
          Reset Filters
        </button>

      </div>

    </div>
  );
}

export default MaintenanceToolbar;