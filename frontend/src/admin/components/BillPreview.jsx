import {
  FaTimes,
  FaPrint,
  FaDownload,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";

function BillPreview({ isOpen, onClose, bill }) {
  if (!isOpen || !bill) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    try {
      const pdf = new jsPDF();
      const resident = bill.resident?.name || "Resident";
      pdf.setFontSize(18);
      pdf.text("Digital Society Management", 20, 20);
      pdf.setFontSize(13);
      pdf.text("Maintenance Invoice", 20, 30);
      pdf.setFontSize(11);
      const lines = [
        `Invoice: ${bill._id}`, `Resident: ${resident}`, `Flat: ${bill.resident?.flatNumber || "N/A"}`,
        `Bill month: ${bill.billMonth}`, `Due date: ${formattedDueDate}`, `Status: ${bill.status}`,
        `Amount due: INR ${Number(bill.amount || 0).toLocaleString("en-IN")}`,
      ];
      if (bill.transactionId) lines.push(`Transaction: ${bill.transactionId}`);
      if (bill.notes) lines.push(`Notes: ${bill.notes}`);
      pdf.text(lines, 20, 45, { maxWidth: 170, lineHeightFactor: 1.6 });
      pdf.save(`maintenance-invoice-${bill._id.slice(-8)}.pdf`);
      toast.success("Invoice downloaded.");
    } catch {
      toast.error("Could not generate the invoice PDF.");
    }
  };

  const formattedIssueDate = new Date(bill.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  });

  const formattedDueDate = new Date(bill.dueDate).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  });

  const baseAmount = Math.round(bill.amount / 1.18);
  const gstAmount = bill.amount - baseAmount;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex justify-between items-center border-b px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-3xl">
                <FaFileInvoiceDollar />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Maintenance Invoice
                </h2>
                <p className="text-slate-500">
                  Invoice details for {bill.resident?.name}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full hover:bg-white flex items-center justify-center text-slate-600"
            >
              <FaTimes />
            </button>
          </div>

          {/* Invoice Body */}
          <div className="flex-1 overflow-y-auto p-10 printable-area">

            {/* Society Header */}
            <div className="flex flex-col md:flex-row justify-between gap-8 border-b pb-8">
              <div className="flex gap-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  DS
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    Digital Society Management
                  </h1>
                  <p className="mt-2 text-slate-500">
                    Green Avenue Society
                  </p>
                  <p className="text-slate-500">
                    Rajkot, Gujarat – 360001
                  </p>
                  <div className="mt-3 space-y-1 text-sm text-slate-600">
                    <p>📞 +91 9876543210</p>
                    <p>📧 support@digitalsociety.com</p>
                    <p>🌐 www.digitalsociety.com</p>
                    <p>GSTIN : 24ABCDE1234F1Z5</p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <h2 className="text-lg font-semibold text-slate-500">
                  Invoice Number
                </h2>
                <p className="text-3xl font-bold text-blue-700 mt-2 uppercase">
                  {bill._id.slice(-8)}
                </p>
                <div className="mt-6">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full font-semibold ${
                    bill.status === "Paid" ? "bg-green-100 text-green-700" :
                    bill.status === "Overdue" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    ● {bill.status} {bill.status === "Paid" && bill.paymentMethod ? ` via ${bill.paymentMethod}` : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Resident Details */}
            <div className="grid md:grid-cols-2 gap-10 mt-8">
              <div>
                <h3 className="font-bold text-lg mb-4 text-slate-800">Resident Details</h3>
                <p className="mb-2"><strong className="text-slate-600">Name:</strong> {bill.resident?.name || "N/A"}</p>
                <p className="mb-2"><strong className="text-slate-600">Flat:</strong> {bill.resident?.flatNumber || "N/A"}</p>
                <p className="mb-2"><strong className="text-slate-600">Email:</strong> {bill.resident?.email || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4 text-slate-800">Bill Details</h3>
                <p className="mb-2"><strong className="text-slate-600">Month:</strong> {bill.billMonth}</p>
                <p className="mb-2"><strong className="text-slate-600">Issue Date:</strong> {formattedIssueDate}</p>
                <p className="mb-2"><strong className="text-slate-600">Due Date:</strong> {formattedDueDate}</p>
              </div>
            </div>

            {/* Charges Table */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-5">
                Charges Summary
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="text-left px-5 py-4 text-slate-700">Description</th>
                      <th className="text-right px-5 py-4 text-slate-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-5 py-4">Total Maintenance Charges</td>
                      <td className="px-5 py-4 text-right">₹{baseAmount.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-5 py-4">GST (18%)</td>
                      <td className="px-5 py-4 text-right">₹{gstAmount.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {bill.notes && (
              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h4 className="font-bold text-amber-800 mb-2">Notes</h4>
                <p className="text-amber-700">{bill.notes}</p>
              </div>
            )}

            {/* Total */}
            <div className="mt-8 flex justify-end">
              <div className="w-full max-w-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 shadow-lg">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span>₹{baseAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between mt-4 text-lg">
                  <span>GST</span>
                  <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <hr className="my-5 border-white/30" />
                <div className="flex justify-between text-3xl font-bold">
                  <span>Total</span>
                  <span>₹{bill.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="border-t bg-slate-50 px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-5 shrink-0">
            <div>
              <h4 className="font-semibold text-slate-700">Invoice Actions</h4>
              <p className="text-sm text-slate-500 mt-1">Print or download this invoice.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 transition font-medium text-slate-700"
              >
                <FaPrint /> Print
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-700 text-white hover:bg-slate-800 transition font-medium"
              >
                <FaDownload /> Download PDF
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default BillPreview;
