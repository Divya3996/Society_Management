import { useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaUser,
  FaPhone,
  FaHome,
  FaCar,
  FaCalendarAlt,
  FaClock,
  FaIdBadge,
} from "react-icons/fa";

function QRPassPreview({ onClose, visitor }) {
  const passRef = useRef(null);
  if (!visitor) return null;

  const handleDownload = async () => {
    try {
      const canvas = await html2canvas(passRef.current, { backgroundColor: "#ffffff", scale: 2 });
      const link = document.createElement("a");
      link.download = `visitor-pass-${(visitor._id || visitor.id || "guest").slice(-6)}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      toast.error("Could not download the visitor pass. Please try again.");
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) {
      toast.error("Please allow pop-ups to print the visitor pass.");
      return;
    }
    printWindow.document.write(`<!doctype html><html><head><title>Visitor Pass</title><style>body{margin:0;padding:24px;font-family:Arial,sans-serif}svg{max-width:260px}</style></head><body>${passRef.current.outerHTML}</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const visitorId = visitor._id || visitor.id;
  const qrData = JSON.stringify({ visitorId: String(visitorId) });

  const formattedDate = visitor.expectedDate 
    ? new Date(visitor.expectedDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "—";

  const formattedTime = visitor.expectedDate
    ? new Date(visitor.expectedDate).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    : "—";

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

      {/* Preview */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">

        <div ref={passRef} className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden">

          {/* Blue Top Strip */}
          <div className="h-3 bg-gradient-to-r from-blue-600 to-indigo-600" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              absolute
              top-5
              right-5
              w-11
              h-11
              rounded-full
              bg-slate-100
              hover:bg-red-500
              hover:text-white
              transition
              flex
              items-center
              justify-center
            "
          >
            <FaTimes />
          </button>

          <div className="grid lg:grid-cols-2 gap-14 p-12">

            {/* LEFT SIDE */}

            <div>

              <h2 className="text-4xl font-bold text-slate-800 mb-10">
                Visitor Details
              </h2>

              <div className="space-y-7">

                <InfoRow
                  icon={<FaUser className="text-blue-600" />}
                  title="Visitor Name"
                  value={visitor.name}
                />

                <InfoRow
                  icon={<FaPhone className="text-green-600" />}
                  title="Phone"
                  value={visitor.phone || "—"}
                />

                <InfoRow
                  icon={<FaHome className="text-orange-500" />}
                  title="Flat"
                  value={visitor.flatNumber || visitor.resident?.flatNumber || "—"}
                />

                <InfoRow
                  icon={<FaCar className="text-purple-600" />}
                  title="Vehicle"
                  value={visitor.vehicleNumber || "—"}
                />

                <InfoRow
                  icon={<FaCalendarAlt className="text-red-500" />}
                  title="Visit Date"
                  value={formattedDate}
                />

                <InfoRow
                  icon={<FaClock className="text-cyan-600" />}
                  title="Visit Time"
                  value={formattedTime}
                />

                <InfoRow
                  icon={<FaIdBadge className="text-indigo-600" />}
                  title="Visitor ID"
                  value={(visitor._id || visitor.id || "").slice(-6).toUpperCase()}
                />

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="flex flex-col items-center justify-center">

              <div className="border rounded-3xl p-8 shadow-lg bg-white">
                <QRCode
                  value={qrData}
                  size={260}
                />
              </div>

              <h3 className="text-4xl font-bold mt-8">
                {visitor.name}
              </h3>

              <p className="text-slate-500 text-xl mt-2">
                Flat {visitor.flatNumber || visitor.resident?.flatNumber || "—"}
              </p>

              <span className="mt-6 px-6 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-lg">
                {visitor.purpose}
              </span>

              <p className="mt-8 text-slate-500 text-center max-w-sm">
                Please show this QR Pass to the Security Guard during entry.
              </p>

              {/* Buttons */}

              <div className="flex gap-4 mt-10">

                <button
                  type="button"
                  onClick={handleDownload}
                  className="
                    px-7
                    py-3
                    rounded-xl
                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                    transition
                  "
                >
                  Download
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="
                    px-7
                    py-3
                    rounded-xl
                    border
                    border-slate-300
                    hover:bg-slate-100
                    transition
                  "
                >
                  Print
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

function InfoRow({ icon, title, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-5">

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-xl">
          {icon}
        </div>

        <span className="text-2xl text-slate-600">
          {title}
        </span>

      </div>

      <span className="font-semibold text-2xl text-slate-800">
        {value}
      </span>

    </div>
  );
}

export default QRPassPreview;
