import { FaEye, FaCreditCard, FaFileInvoiceDollar } from "react-icons/fa";

function getStatusBadge(status) {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Overdue":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function MaintenanceTable({ bills = [], onView, onPay }) {
  if (bills.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center h-full flex flex-col justify-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <FaFileInvoiceDollar className="text-blue-300 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">All Clear!</h3>
        <p className="text-slate-400 text-sm mt-1">You have no pending maintenance bills.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Month</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Due Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                <td className="px-6 py-5 font-semibold text-slate-800">{bill.billMonth}</td>
                <td className="px-6 py-5 font-bold text-slate-800">
                  ₹{bill.amount?.toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-5 text-slate-600">
                  {bill.dueDate
                    ? new Date(bill.dueDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(bill.status)}`}>
                    {bill.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onView(bill)}
                      title="View Bill"
                      className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => onPay(bill)}
                      title="Pay Now"
                      className="w-10 h-10 rounded-xl bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition flex items-center justify-center"
                    >
                      <FaCreditCard />
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