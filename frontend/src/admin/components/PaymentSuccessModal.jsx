import { FaCheckCircle, FaTimes } from "react-icons/fa";
function PaymentSuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg">

          {/* Header */}
          <div className="flex justify-between items-center border-b px-8 py-6">

            <h2 className="text-2xl font-bold text-slate-800">
              Payment Successful
            </h2>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center"
            >
              <FaTimes />
            </button>

          </div>

          {/* Body */}
          <div className="p-8 text-center">

            <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-6" />

            <h3 className="text-3xl font-bold text-green-600">
              Payment Completed
            </h3>

            <p className="text-slate-500 mt-3">
              Your maintenance payment has been received successfully.
            </p>

            <div className="mt-8 bg-slate-50 rounded-2xl p-6 space-y-4">

              <div className="flex justify-between">
                <span>Amount Paid</span>
                <span className="font-bold">₹5,133</span>
              </div>

              <div className="flex justify-between">
                <span>Payment Method</span>
                <span>PhonePe</span>
              </div>

              <div className="flex justify-between">
                <span>Transaction ID</span>
                <span>TXN-2026-874563</span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>
                <span>01 July 2026</span>
              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="border-t px-8 py-5 flex justify-end gap-4">

            <button
              className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
            >
              Download Receipt
            </button>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
            >
              Done
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default PaymentSuccessModal;