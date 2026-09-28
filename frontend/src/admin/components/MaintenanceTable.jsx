import {
  FaEye,
  FaTrash,
  FaFileInvoiceDollar,
} from "react-icons/fa";

function getStatusColor(status) {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Overdue":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function MaintenanceTable({ bills = [], onView, onDelete }) {
  if (bills.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <FaFileInvoiceDollar className="text-blue-300 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No bills generated yet</h3>
        <p className="text-slate-400 text-sm mt-1">Generate bills for residents using the button above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-slate-600">
              <th className="px-6 py-4">Invoice</th>
              <th className="px-6 py-4">Resident</th>
              <th className="px-6 py-4">Flat</th>
              <th className="px-6 py-4">Month</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Payment Method</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr
                key={bill._id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-6 py-5 font-semibold text-blue-600 text-sm">
                  {bill._id?.slice(-6).toUpperCase()}
                </td>

                <td className="px-6 py-5 font-medium text-slate-800">
                  {bill.resident?.name || "—"}
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {bill.resident?.flatNumber || "—"}
                </td>

                <td className="px-6 py-5 text-slate-600">
                  {bill.billMonth}
                </td>

                <td className="px-6 py-5 font-semibold text-slate-800">
                  ₹{bill.amount?.toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-5 text-slate-600 text-sm">
                  {bill.dueDate
                    ? new Date(bill.dueDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(bill.status)}`}
                  >
                    {bill.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  {bill.paymentMethod ? (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                      {bill.paymentMethod}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-sm">—</span>
                  )}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView && onView(bill)}
                      title="View Bill"
                      className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition flex items-center justify-center"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => onDelete && onDelete(bill._id)}
                      title="Delete Bill"
                      className="w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaintenanceTable;