import { FaTimes, FaFileInvoiceDollar } from "react-icons/fa";

function BillDetailsModal({ isOpen, onClose, bill }) {
  if (!isOpen || !bill) return null;

  const baseAmount = Math.round(bill.amount / 1.18);
  const gstAmount = bill.amount - baseAmount;

  const formattedDueDate = new Date(bill.dueDate).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-bold">
              Maintenance Bill
            </h2>
            <p className="text-blue-100">
              INV-{bill._id.slice(-6).toUpperCase()}
            </p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">

          {/* Society */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <FaFileInvoiceDollar className="text-blue-600 text-3xl" />
              <div>
                <h3 className="font-bold text-lg text-slate-800">
                  Digital Society Management
                </h3>
                <p className="text-slate-500 text-sm">
                  Monthly Maintenance Bill
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-200">
              <div>
                <p className="text-slate-500 text-sm mb-1">Flat Number</p>
                <p className="font-semibold text-slate-800">{bill.resident?.flatNumber || "N/A"}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-1">Month</p>
                <p className="font-semibold text-slate-800">{bill.billMonth}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-1">Due Date</p>
                <p className="font-semibold text-slate-800">{formattedDueDate}</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-1">Status</p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  bill.status === "Paid" ? "bg-green-100 text-green-700" :
                  bill.status === "Overdue" ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {bill.status}
                </span>
              </div>
            </div>
          </div>

          {/* Charges */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4 text-slate-600">Total Maintenance Charges</td>
                  <td className="px-5 py-4 text-right font-semibold text-slate-800">
                    ₹{baseAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4 text-slate-600">GST (18%)</td>
                  <td className="px-5 py-4 text-right font-semibold text-slate-800">
                    ₹{gstAmount.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr className="bg-slate-100">
                  <td className="px-5 py-5 text-lg font-bold text-slate-800">
                    Total Amount
                  </td>
                  <td className="px-5 py-5 text-right text-2xl font-bold text-blue-600">
                    ₹{bill.amount.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {bill.notes && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <h4 className="font-bold text-blue-800 mb-1">Notes</h4>
              <p className="text-blue-700 text-sm">{bill.notes}</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t bg-slate-50 px-6 py-5 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="bg-slate-200 text-slate-700 font-semibold px-8 py-2.5 rounded-xl hover:bg-slate-300 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default BillDetailsModal;