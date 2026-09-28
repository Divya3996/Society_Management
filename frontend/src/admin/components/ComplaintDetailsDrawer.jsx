import { useState } from "react";
import {
  FaTimes,
  FaUser,
  FaHome,
  FaPhone,
  FaEnvelope,
  FaClipboardList,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaExclamationTriangle
} from "react-icons/fa";

function ComplaintDetailsDrawer({ isOpen, onClose, complaint, onUpdateStatus }) {
  const [updatingStatus, setUpdatingStatus] = useState(false);

  if (!isOpen || !complaint) return null;

  const handleStatusUpdate = async (status) => {
    setUpdatingStatus(true);
    try {
      const updated = await onUpdateStatus(status, "");
      if (updated) onClose();
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved": return "bg-green-100 text-green-700";
      case "In Progress": return "bg-blue-100 text-blue-700";
      case "Pending": return "bg-orange-100 text-orange-700";
      case "Rejected": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const formattedDate = new Date(complaint.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const formattedTime = new Date(complaint.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

      <div className="fixed top-0 right-0 h-screen w-full md:w-[520px] bg-white shadow-2xl z-50 flex flex-col">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 px-6 py-5 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-white">Complaint Details</h2>
            <p className="text-red-100 mt-1">Complaint ID : {(complaint._id || "").slice(-6).toUpperCase()}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-white/20 text-white flex items-center justify-center transition">
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Current Status</span>
            <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(complaint.status)}`}>
              {complaint.status}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Resident Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaUser className="text-red-500" />
                <div>
                  <p className="text-sm text-slate-500">Resident</p>
                  <p className="font-semibold">{complaint.resident?.name || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaHome className="text-red-500" />
                <div>
                  <p className="text-sm text-slate-500">Flat</p>
                  <p className="font-semibold">{complaint.resident?.flatNumber || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-red-500" />
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-semibold">{complaint.resident?.phone || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-red-500" />
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-semibold">{complaint.resident?.email || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Complaint Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <FaClipboardList className="text-red-500 mb-2" />
                <p className="text-sm text-slate-500">Category</p>
                <p className="font-semibold">{complaint.category}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <FaExclamationTriangle className="text-red-500 mb-2" />
                <p className="text-sm text-slate-500">Priority</p>
                <p className={`font-semibold ${complaint.priority === 'High' ? 'text-red-600' : complaint.priority === 'Medium' ? 'text-amber-500' : 'text-green-600'}`}>
                  {complaint.priority}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <FaCalendarAlt className="text-red-500 mb-2" />
                <p className="text-sm text-slate-500">Date</p>
                <p className="font-semibold">{formattedDate}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <FaClock className="text-red-500 mb-2" />
                <p className="text-sm text-slate-500">Time</p>
                <p className="font-semibold">{formattedTime}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Location</h3>
            <div className="bg-slate-50 rounded-xl p-5 flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500" />
              <p>{complaint.location || "Not specified"}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Subject</h3>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <p className="font-semibold text-slate-800">{complaint.subject}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Complaint Description</h3>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <p className="leading-7 text-slate-600 whitespace-pre-wrap">{complaint.description}</p>
            </div>
          </div>

        </div>

        <div className="border-t bg-white px-6 py-5 flex flex-wrap justify-end gap-3 shrink-0">
          
          {complaint.status !== "Resolved" && (
            <button
              onClick={() => handleStatusUpdate("Resolved")}
              disabled={updatingStatus}
              className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition flex items-center gap-2 disabled:opacity-70"
            >
              Mark Resolved
            </button>
          )}

          {complaint.status === "Pending" && (
            <button
              onClick={() => handleStatusUpdate("In Progress")}
              disabled={updatingStatus}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition flex items-center gap-2 disabled:opacity-70"
            >
              In Progress
            </button>
          )}
          
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default ComplaintDetailsDrawer;
