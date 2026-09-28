import { useState, useEffect } from "react";
import { getBills, payBill } from "../../services/maintenanceService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { publishNotification } from "../../services/notificationStore";

import MaintenanceStats from "../components/maintenance/MaintenanceStats";
import MaintenanceToolbar from "../components/maintenance/MaintenanceToolbar";
import MaintenanceTable from "../components/maintenance/MaintenanceTable";
import PaymentHistory from "../components/maintenance/PaymentHistory";
import BillDetailsModal from "../components/maintenance/BillDetailsModal";
import PayBillModal from "../components/maintenance/PayBillModal";

function Maintenance() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", month: "All Months", status: "All Status" });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

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
    const matchesSearch = !search || [bill._id, bill.billMonth, bill.amount]
      .some((value) => String(value || "").toLowerCase().includes(search));
    const matchesMonth = filters.month === "All Months" || String(bill.billMonth || "").toLowerCase().includes(filters.month.toLowerCase());
    const matchesStatus = filters.status === "All Status" || bill.status === filters.status;
    return matchesSearch && matchesMonth && matchesStatus;
  });

  const handleView = (bill) => {
    setSelectedBill(bill);
    setShowDetailsModal(true);
  };

  const handlePay = (bill) => {
    setSelectedBill(bill);
    setShowPayModal(true);
  };

  const submitPayment = async (paymentMethod) => {
    try {
      await payBill(selectedBill._id, paymentMethod);
      toast.success("Payment successful!");
      publishNotification({
        title: "Payment successful",
        message: `Your ${selectedBill.billMonth || "maintenance"} bill payment was recorded.`,
        path: "/resident/maintenance",
        type: "success",
      });
      setShowPayModal(false);
      fetchBills();
    } catch (error) {
      toast.error("Payment failed. Try again.");
    }
  };

  // Compute stats
  const pendingBills = filteredBills.filter(b => b.status === "Pending" || b.status === "Overdue");
  const paidBills = filteredBills.filter(b => b.status === "Paid");
  
  const totalPendingAmount = pendingBills.reduce((sum, b) => sum + b.amount, 0);
  const totalPaidAmount = paidBills.reduce((sum, b) => sum + b.amount, 0);

  const stats = {
    pendingCount: pendingBills.length,
    pendingAmount: totalPendingAmount,
    paidCount: paidBills.length,
    paidAmount: totalPaidAmount,
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Maintenance Bills</h1>
        <p className="text-slate-500 mt-2">
          View your maintenance invoices, make payments, and check history.
        </p>
      </div>

      {/* Stats */}
      <MaintenanceStats stats={stats} />

      {/* Toolbar */}
      <div className="mt-8">
        <MaintenanceToolbar filters={filters} onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} />
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
          {/* Active Bills Table (Left Side) */}
          <div className="xl:col-span-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Pending Bills</h2>
            <MaintenanceTable 
              bills={pendingBills}
              onView={handleView}
              onPay={handlePay}
            />
          </div>

          {/* Payment History (Right Side) */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Payment History</h2>
            <PaymentHistory bills={paidBills} onView={handleView} />
          </div>
        </div>
      )}

      {/* Modals */}
      <BillDetailsModal
        isOpen={showDetailsModal}
        bill={selectedBill}
        onClose={() => setShowDetailsModal(false)}
        onPay={handlePay}
      />

      <PayBillModal
        isOpen={showPayModal}
        bill={selectedBill}
        onClose={() => setShowPayModal(false)}
        onSubmit={submitPayment}
      />
    </>
  );
}

export default Maintenance;