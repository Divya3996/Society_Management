import { FaTimes, FaCreditCard, FaUniversity, FaMobileAlt, FaSpinner } from "react-icons/fa";
import { useState } from "react";

function PayBillModal({ isOpen, onClose, bill, onSubmit }) {
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !bill) return null;

  const handlePayment = async () => {
    setLoading(true);
    try {
      await onSubmit(paymentMethod);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-bold">
              Pay Maintenance Bill
            </h2>
            <p className="text-blue-100 text-sm">
              Secure Payment Gateway
            </p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8 overflow-y-auto">

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div className="flex justify-between mb-4">
              <span className="text-slate-500 font-medium">Invoice No.</span>
              <strong className="text-slate-800 text-lg uppercase">{bill._id.slice(-6)}</strong>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-slate-500 font-medium">Billing Month</span>
              <strong className="text-slate-800 text-lg">{bill.billMonth}</strong>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <span className="text-slate-500 font-medium">Total Amount</span>
              <span className="text-3xl font-bold text-blue-600">
                ₹{bill.amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 text-lg mb-4">
              Select Payment Method
            </h3>
            <div className="space-y-4">
              
              <label className={`flex items-center gap-4 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${paymentMethod === 'UPI' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-400'}`}>
                <input
                  type="radio"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 accent-blue-600"
                />
                <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                  <FaMobileAlt className="text-blue-600 text-xl" />
                </div>
                <span className="font-semibold text-slate-700 text-lg">UPI (GPay, PhonePe)</span>
              </label>

              <label className={`flex items-center gap-4 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${paymentMethod === 'Online' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-400'}`}>
                <input
                  type="radio"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 accent-blue-600"
                />
                <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                  <FaCreditCard className="text-green-600 text-xl" />
                </div>
                <span className="font-semibold text-slate-700 text-lg">Credit / Debit Card</span>
              </label>

              <label className={`flex items-center gap-4 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${paymentMethod === 'NEFT' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-400'}`}>
                <input
                  type="radio"
                  value="NEFT"
                  checked={paymentMethod === "NEFT"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 accent-blue-600"
                />
                <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
                  <FaUniversity className="text-purple-600 text-xl" />
                </div>
                <span className="font-semibold text-slate-700 text-lg">Net Banking</span>
              </label>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="border-t bg-slate-50 px-8 py-5 flex justify-end gap-4 shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <FaSpinner className="animate-spin" /> : null}
            Pay Now
          </button>
        </div>

      </div>
    </div>
  );
}

export default PayBillModal;
