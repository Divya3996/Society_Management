import { useRef } from "react";
import { FaTimes, FaDownload } from "react-icons/fa";
import QRCode from "react-qr-code";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";

function QRPassModal({ isOpen, onClose, visitor }) {
  const passRef = useRef(null);

  if (!isOpen || !visitor) return null;

  const visitorId = visitor._id || visitor.id;
  const qrData = JSON.stringify({ visitorId: String(visitorId) });

  const downloadPDF = async () => {
    try {
      const canvas = await html2canvas(passRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth() - 20;
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, width, (canvas.height * width) / canvas.width);
      pdf.save(`visitor-pass-${(visitor._id || visitor.id || "guest").slice(-6)}.pdf`);
    } catch {
      toast.error("Could not create the visitor pass PDF.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold">
              Digital Society
            </h2>

            <p className="text-sm text-blue-100">
              Visitor Entry Pass
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white text-xl hover:text-red-200"
          >
            <FaTimes />
          </button>

        </div>

        {/* Pass */}
        <div ref={passRef} className="p-6">

          {/* QR */}
          <div className="flex justify-center mb-6">

            <div className="bg-white border rounded-2xl p-4 shadow">

              <QRCode
                value={qrData}
                size={170}
              />

            </div>

          </div>

          {/* Pass ID */}
          <div className="mb-5 text-center">

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              Pass ID : {(visitor._id || visitor.id || "").slice(-8).toUpperCase()}
            </span>

          </div>

          {/* Details */}

          <div className="space-y-3 text-sm">

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-slate-500">Resident</span>
              <span className="font-semibold">{visitor.resident?.name || "Resident"}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-slate-500">Flat No.</span>
              <span className="font-semibold">{visitor.flatNumber || visitor.resident?.flatNumber || "—"}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-slate-500">Visitor</span>
              <span className="font-semibold">{visitor.name}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-slate-500">Mobile</span>
              <span>{visitor.phone || "—"}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-slate-500">Purpose</span>
              <span>{visitor.purpose}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-slate-500">Visit Date</span>
              <span>{visitor.expectedDate ? new Date(visitor.expectedDate).toLocaleDateString("en-IN") : "—"}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-slate-500">Visit Time</span>
              <span>{visitor.expectedDate ? new Date(visitor.expectedDate).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "—"}</span>
            </div>

            <div className="flex justify-between">

              <span className="font-medium text-slate-500">
                Status
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                {visitor.status}
              </span>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-8 border-t pt-4 text-center text-xs text-slate-500">

            <p>Digital Society Management</p>

            <p>Smart Living • Secure Community</p>

            <p className="mt-2">
              Valid for Single Entry
            </p>

          </div>

        </div>

        {/* Download */}

        <div className="p-6 pt-0">

          <button
            onClick={downloadPDF}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition duration-300"
          >
            <FaDownload />
            Download Visitor Pass
          </button>

        </div>

      </div>

    </div>
  );
}

export default QRPassModal;
