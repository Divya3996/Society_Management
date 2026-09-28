import { useState } from "react";
import { FaCalendarAlt, FaFilePdf, FaFileExcel } from "react-icons/fa";
import { toast } from "react-toastify";

function ReportToolbar({ bills = [] }) {
  const [dateRange, setDateRange] = useState("");

  const handleExportCSV = () => {
    try {
      const filteredBills = dateRange
        ? bills.filter((bill) => bill.createdAt?.slice(0, 10) === dateRange)
        : bills;

      if (filteredBills.length === 0) {
        toast.info("No bills available to export.");
        return;
      }

      // Headers
      const headers = [
        "Bill ID",
        "Resident Name",
        "Flat Number",
        "Month",
        "Amount (INR)",
        "Due Date",
        "Status",
        "Payment Method",
        "Transaction ID",
      ];

      // Rows
      const rows = filteredBills.map((b) => [
        b._id || "",
        `"${b.resident?.name || "N/A"}"`,
        `"${b.resident?.flatNumber || "N/A"}"`,
        `"${b.billMonth || ""}"`,
        b.amount || 0,
        b.dueDate ? new Date(b.dueDate).toLocaleDateString() : "",
        b.status || "Pending",
        `"${b.paymentMethod || "N/A"}"`,
        `"${b.transactionId || "N/A"}"`,
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `society_report_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Excel/CSV report exported successfully!");
    } catch (error) {
      toast.error("Failed to export report.");
    }
  };

  const handleExportPDF = () => {
    toast.info("Opening print dialog. Select 'Save as PDF' to download.");
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8 print:hidden">
      <div className="flex flex-col xl:flex-row justify-between gap-4">
        {/* Export filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">
              Bill creation date
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-end gap-3">
          <button
            type="button"
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition font-medium shadow-sm"
          >
            <FaFilePdf />
            Export PDF
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition font-medium shadow-sm"
          >
            <FaFileExcel />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportToolbar;
