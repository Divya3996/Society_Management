import { FaCheckCircle, FaDownload, FaEye } from "react-icons/fa";

function PaymentHistory({ bills = [], onView }) {
  if (bills.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center h-full flex flex-col justify-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
          <FaCheckCircle className="text-slate-300 text-2xl" />
        </div>
        <p className="text-slate-500 text-sm">No past payments found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 h-full overflow-y-auto max-h-[600px]">
      <div className="space-y-4">
        {bills.map((bill) => (
          <div
            key={bill._id}
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <FaCheckCircle className="text-xl" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">
                  {bill.billMonth} Maintenance
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Paid on: {bill.paidAt ? new Date(bill.paidAt).toLocaleDateString() : "—"} via {bill.paymentMethod}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-slate-800">
                ₹{bill.amount?.toLocaleString("en-IN")}
              </p>
              <div className="flex justify-end gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onView(bill)}
                  title="View Receipt"
                  className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center"
                >
                  <FaEye size={12} />
                </button>
                <button
                  title="Download Receipt"
                  className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-600 hover:text-white transition flex items-center justify-center"
                >
                  <FaDownload size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentHistory;