import { FaSearch, FaEye, FaDownload, FaFileInvoiceDollar } from "react-icons/fa";
import { useState } from "react";

function PaymentHistory({ bills = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Filter bills
  const filteredBills = bills.filter((bill) => {
    const matchesSearch =
      bill._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.resident?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      statusFilter === "All Status" || bill.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mt-10 bg-white rounded-3xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Payment History</h2>
          <p className="text-slate-500 mt-1 text-sm">
            View and manage all maintenance payment records.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Invoice or Resident..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-5 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option>All Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
      </div>

      {/* ================= Payment Table ================= */}
      {filteredBills.length === 0 ? (
        <div className="p-12 text-center border-t border-slate-100">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <FaFileInvoiceDollar className="text-blue-300 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700">No records found</h3>
          <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-6 py-4 text-left">Invoice</th>
                <th className="px-6 py-4 text-left">Resident</th>
                <th className="px-6 py-4 text-left">Flat</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Payment Method</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBills.map((bill) => (
                <tr key={bill._id} className="border-t hover:bg-slate-50 transition">
                  <td className="px-6 py-5 font-semibold text-blue-600 text-sm">
                    {bill._id?.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {bill.resident?.name || "—"}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {bill.resident?.flatNumber || "—"}
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-800">
                    ₹{bill.amount?.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4">
                    {bill.paymentMethod ? (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                        {bill.paymentMethod}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm">
                    {bill.paidAt
                      ? new Date(bill.paidAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        bill.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : bill.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        title="View Receipt"
                        className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition flex items-center justify-center"
                      >
                        <FaEye />
                      </button>
                      {bill.status === "Paid" && (
                        <button
                          title="Download Receipt"
                          className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition flex items-center justify-center"
                        >
                          <FaDownload />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;