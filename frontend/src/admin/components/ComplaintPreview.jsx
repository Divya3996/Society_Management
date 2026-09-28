import {
  FaTimes,
  FaCheckCircle,
  FaPrint,
  FaFilePdf,
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaClipboardList,
} from "react-icons/fa";

function ComplaintPreview({ onClose }) {
  return (
    <>
      {/* Overlay */}

      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-red-600 to-orange-500 px-8 py-6 flex justify-between items-center">

            <div className="flex items-center gap-4">

              <div className="bg-white/20 rounded-full p-3">

                <FaCheckCircle
                  size={34}
                  className="text-white"
                />

              </div>

              <div>

                <h2 className="text-3xl font-bold text-white">
                  Complaint Registered
                </h2>

                <p className="text-red-100 mt-1">
                  Complaint has been successfully submitted.
                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition"
            >
              <FaTimes />
            </button>

          </div>

          {/* Body */}

          <div className="p-8">

            {/* Complaint ID */}

            <div className="flex justify-between items-center mb-8">

              <div>

                <p className="text-slate-500">
                  Complaint ID
                </p>

                <h2 className="text-3xl font-bold text-slate-800">
                  CMP-2026-001
                </h2>

              </div>

              <span className="bg-orange-100 text-orange-700 px-5 py-2 rounded-full font-semibold">
                OPEN
              </span>

            </div>

            {/* Information Grid */}

            <div className="grid md:grid-cols-2 gap-6">

              {/* Resident */}

              <div className="bg-slate-50 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-2">

                  <FaUser className="text-red-500" />

                  <span className="font-semibold">
                    Resident
                  </span>

                </div>

                <p className="text-slate-700">
                  Rahul Sharma
                </p>

              </div>

              {/* Flat */}

              <div className="bg-slate-50 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-2">

                  <FaHome className="text-red-500" />

                  <span className="font-semibold">
                    Flat Number
                  </span>

                </div>

                <p>A-302</p>

              </div>

              {/* Category */}

              <div className="bg-slate-50 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-2">

                  <FaClipboardList className="text-red-500" />

                  <span className="font-semibold">
                    Category
                  </span>

                </div>

                <p>Water Leakage</p>

              </div>

              {/* Priority */}

              <div className="bg-slate-50 rounded-2xl p-5">

                <div className="flex items-center justify-between">

                  <span className="font-semibold">
                    Priority
                  </span>

                  <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full font-semibold">
                    HIGH
                  </span>

                </div>

              </div>

              {/* Date */}

              <div className="bg-slate-50 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-2">

                  <FaCalendarAlt className="text-red-500" />

                  <span className="font-semibold">
                    Date
                  </span>

                </div>

                <p>13 July 2026</p>

              </div>

              {/* Time */}

              <div className="bg-slate-50 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-2">

                  <FaClock className="text-red-500" />

                  <span className="font-semibold">
                    Time
                  </span>

                </div>

                <p>10:45 AM</p>

              </div>

            </div>
                        {/* Description */}

            <div className="mt-8">

              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Complaint Description
              </h3>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">

                <p className="leading-7 text-slate-600">
                  Water leakage has been observed from the kitchen ceiling
                  since yesterday evening. The leakage is increasing and may
                  damage electrical fittings if not repaired soon.
                </p>

              </div>

            </div>

            {/* Uploaded Image */}

            <div className="mt-8">

              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Attached Image
              </h3>

              <div className="border-2 border-dashed border-slate-300 rounded-2xl h-64 flex flex-col items-center justify-center bg-slate-50">

                <div className="text-6xl mb-4">
                  🖼️
                </div>

                <h4 className="text-lg font-semibold text-slate-700">
                  Image Preview
                </h4>

                <p className="text-slate-500 mt-2">
                  Uploaded complaint image will appear here.
                </p>

              </div>

            </div>

            {/* Complaint Status */}

            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">

              <div className="flex items-center gap-4">

                <FaCheckCircle
                  className="text-green-600"
                  size={38}
                />

                <div>

                  <h3 className="text-xl font-bold text-green-700">
                    Complaint Submitted Successfully
                  </h3>

                  <p className="text-green-600 mt-1">
                    Your complaint has been recorded and will be reviewed by the
                    society management shortly.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="border-t bg-slate-50 px-8 py-5 flex flex-wrap justify-end gap-4">

            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:bg-white transition"
            >
              <FaPrint />

              Print
            </button>

            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
            >
              <FaFilePdf />

              Download PDF
            </button>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-900 transition"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </>
  );
}

export default ComplaintPreview;