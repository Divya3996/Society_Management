import { useState, useEffect } from "react";
import { getBills, deleteBill } from "../../services/maintenanceService";
import { toast } from "react-toastify";
import { SkeletonPage } from "../../components/Skeletons";

import MaintenanceStats from "../components/MaintenanceStats";
import MaintenanceToolbar from "../components/MaintenanceToolbar";
import MaintenanceTable from "../components/MaintenanceTable";
import GenerateBillModal from "../components/GenerateBillModal";
import BillPreview from "../components/BillPreview";
import PaymentHistory from "../components/PaymentHistory";
import ConfirmDialog from "../../components/ConfirmDialog";

function Maintenance() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", month: "All Months", status: "Payment Status", flat: "All Flats", method: "Payment Method" });
  const [showGenerateBill, setShowGenerateBill] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null });

  const fetchBills = async () => {
    setLoading(true);
    try {
      const data = await getBills();
      setBills(data);
    } catch (error) {
      toast.error("Failed to load maintenance bills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const filteredBills = bills.filter((bill) => {
    const search = filters.search.toLowerCase();
    return (!search || [bill._id, bill.billMonth, bill.resident?.name, bill.resident?.flatNumber]
      .some((value) => String(value || "").toLowerCase().includes(search))) &&
      (filters.month === "All Months" || String(bill.billMonth || "").toLowerCase().includes(filters.month.toLowerCase())) &&
      (filters.status === "Payment Status" || bill.status === filters.status) &&
      (filters.flat === "All Flats" || bill.resident?.flatNumber === filters.flat) &&
      (filters.method === "Payment Method" || bill.paymentMethod === filters.method);
  });

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: async () => {
        setConfirmDialog((d) => ({ ...d, isOpen: false }));
        try {
          await deleteBill(id);
          toast.success("Bill deleted successfully");
          fetchBills();
        } catch (error) {
          toast.error("Failed to delete bill");
        }
      },
    });
  };

  const handleView = (bill) => {
    setSelectedBill(bill);
    setShowPreview(true);
  };

  // Compute stats from live data
  const paidBills = filteredBills.filter((b) => b.status === "Paid");
  const pendingBills = filteredBills.filter((b) => b.status === "Pending");
  const overdueBills = filteredBills.filter((b) => b.status === "Overdue");
  const totalRevenue = paidBills.reduce((sum, b) => sum + b.amount, 0);

  const stats = {
    total: bills.length,
    paid: paidBills.length,
    pending: pendingBills.length + overdueBills.length,
    revenue: totalRevenue,
  };

  const paidBillsData = filteredBills.filter((b) => b.status === "Paid");

  if (loading) {
    return <SkeletonPage />;
  }

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Maintenance Bills</h1>
        <p className="mt-2 text-slate-500">
          Manage maintenance bills, payments, invoices, and resident payment history.
        </p>
      </div>

      {/* Statistics */}
      <MaintenanceStats stats={stats} />

      {/* Toolbar */}
      <MaintenanceToolbar filters={filters} onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} onGenerateBill={() => setShowGenerateBill(true)} />

      {/* Bills Table */}
      <div className="mt-10 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">All Bills</h2>
        <p className="text-slate-500 mt-1">Manage, view, and collect maintenance invoices.</p>
      </div>

      <MaintenanceTable bills={filteredBills} onView={handleView} onDelete={handleDelete} />

      {/* Payment History */}
      <div className="mt-12 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Recent Payment History</h2>
          <p className="text-slate-500 mt-1">
            Track the latest maintenance payments received from residents.
          </p>
        </div>
      </div>

      <PaymentHistory bills={paidBillsData} />

      {/* Generate Bill Modal */}
      <GenerateBillModal
        isOpen={showGenerateBill}
        onClose={() => setShowGenerateBill(false)}
        onSuccess={() => {
          setShowGenerateBill(false);
          fetchBills();
        }}
        onPreview={() => {
          setShowGenerateBill(false);
          setShowPreview(true);
        }}
      />

      {/* Bill Preview */}
      <BillPreview
        isOpen={showPreview}
        bill={selectedBill}
        onClose={() => {
          setShowPreview(false);
          setSelectedBill(null);
        }}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Bill"
        message="Are you sure you want to delete this bill? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((d) => ({ ...d, isOpen: false }))}
      />
    </>
  );
}

export default Maintenance;