import { useState, useEffect } from "react";
import { FaTimes, FaFileInvoiceDollar, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { generateBill } from "../../services/maintenanceService";
import { getAllResidents } from "../../services/userService";

function GenerateBillModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [fetchingResidents, setFetchingResidents] = useState(false);
  const [residents, setResidents] = useState([]);
  
  const [form, setForm] = useState({
    residentId: "", // Empty means all residents
    billMonth: "",
    dueDate: "",
    notes: "",
  });

  const [charges, setCharges] = useState({
    maintenance: 2500,
    water: 300,
    electricity: 450,
    parking: 500,
    lift: 200,
    security: 400,
    previousBalance: 0,
    lateFee: 0,
    discount: 0,
  });

  const GST_RATE = 0.18; // 18%

  useEffect(() => {
    if (isOpen) {
      const fetchResidents = async () => {
        setFetchingResidents(true);
        try {
          const data = await getAllResidents();
          setResidents(data);
        } catch (error) {
          toast.error("Failed to load residents");
        } finally {
          setFetchingResidents(false);
        }
      };
      fetchResidents();

      setForm({
        residentId: "",
        billMonth: "",
        dueDate: "",
        notes: "",
      });
      setCharges({
        maintenance: 2500,
        water: 300,
        electricity: 450,
        parking: 500,
        lift: 200,
        security: 400,
        previousBalance: 0,
        lateFee: 0,
        discount: 0,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChargeChange = (e) => {
    setCharges({ ...charges, [e.target.name]: Number(e.target.value) || 0 });
  };

  const calculateSubtotal = () => {
    return (
      charges.maintenance +
      charges.water +
      charges.electricity +
      charges.parking +
      charges.lift +
      charges.security +
      charges.previousBalance +
      charges.lateFee -
      charges.discount
    );
  };

  const calculateGST = () => {
    return calculateSubtotal() * GST_RATE;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.billMonth || !form.dueDate) {
      toast.error("Billing month and Due date are required.");
      return;
    }

    setLoading(true);
    try {
      await generateBill({
        residentId: form.residentId || undefined,
        billMonth: form.billMonth,
        amount: calculateTotal(),
        dueDate: form.dueDate,
        notes: form.notes,
      });
      toast.success("Bill generated successfully.");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to generate bill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-3xl">
              <FaFileInvoiceDollar />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Generate Maintenance Bill
              </h2>
              <p className="text-slate-500 mt-1">
                Create a maintenance invoice for society residents.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-11 h-11 rounded-full hover:bg-white transition flex items-center justify-center text-slate-600">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8">
          <form id="billForm" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Resident Information */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Resident Information</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block mb-2 font-semibold text-slate-700">Select Resident</label>
                    <select 
                      name="residentId" 
                      value={form.residentId} 
                      onChange={handleFormChange}
                      disabled={fetchingResidents}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="">All Residents (Bulk Generate)</option>
                      {residents.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} - {r.flatNumber || 'No Flat'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Bill Information */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Bill Information</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block mb-2 font-semibold text-slate-700">Billing Month * (e.g. Aug 2026)</label>
                    <input
                      type="text"
                      name="billMonth"
                      value={form.billMonth}
                      onChange={handleFormChange}
                      placeholder="Aug 2026"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-slate-700">Due Date *</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={form.dueDate}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bill Charges */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Bill Charges (₹)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Maintenance Charges</label>
                  <input type="number" name="maintenance" value={charges.maintenance} onChange={handleChargeChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Water Charges</label>
                  <input type="number" name="water" value={charges.water} onChange={handleChargeChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Electricity Charges</label>
                  <input type="number" name="electricity" value={charges.electricity} onChange={handleChargeChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Parking Charges</label>
                  <input type="number" name="parking" value={charges.parking} onChange={handleChargeChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Lift Charges</label>
                  <input type="number" name="lift" value={charges.lift} onChange={handleChargeChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Security Charges</label>
                  <input type="number" name="security" value={charges.security} onChange={handleChargeChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>

            {/* Additional Charges */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Additional Adjustments (₹)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Previous Balance</label>
                  <input type="number" name="previousBalance" value={charges.previousBalance} onChange={handleChargeChange} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Late Fee</label>
                  <input type="number" name="lateFee" value={charges.lateFee} onChange={handleChargeChange} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">Discount</label>
                  <input type="number" name="discount" value={charges.discount} onChange={handleChargeChange} className="w-full rounded-xl border border-slate-300 px-4 py-3" />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-slate-700">GST (Fixed 18%)</label>
                  <input type="text" value="18%" readOnly className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-500 cursor-not-allowed" />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Notes</h3>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleFormChange}
                rows={4}
                placeholder="Enter remarks, payment instructions, or additional information..."
                className="w-full rounded-2xl border border-slate-300 px-5 py-4 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Bill Summary */}
            <div className="mt-10">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-3xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Bill Summary</h3>
                    <p className="text-slate-500">Preview before generating invoice</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
                    {form.billMonth || "Month Not Set"}
                  </span>
                </div>
                <div className="space-y-3 text-slate-700">
                  <div className="flex justify-between"><span>Maintenance Charges</span><span>₹{charges.maintenance}</span></div>
                  <div className="flex justify-between"><span>Water Charges</span><span>₹{charges.water}</span></div>
                  <div className="flex justify-between"><span>Electricity Charges</span><span>₹{charges.electricity}</span></div>
                  <div className="flex justify-between"><span>Parking Charges</span><span>₹{charges.parking}</span></div>
                  <div className="flex justify-between"><span>Lift Charges</span><span>₹{charges.lift}</span></div>
                  <div className="flex justify-between"><span>Security Charges</span><span>₹{charges.security}</span></div>
                  
                  {charges.previousBalance > 0 && <div className="flex justify-between"><span>Previous Balance</span><span>₹{charges.previousBalance}</span></div>}
                  {charges.lateFee > 0 && <div className="flex justify-between text-red-600"><span>Late Fee</span><span>₹{charges.lateFee}</span></div>}
                  {charges.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>- ₹{charges.discount}</span></div>}
                  
                  <div className="flex justify-between"><span>GST (18%)</span><span>₹{calculateGST().toFixed(2)}</span></div>
                  
                  <hr className="my-4 border-slate-300" />
                  
                  <div className="flex justify-between text-3xl font-bold text-blue-700">
                    <span>Total Amount</span>
                    <span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="border-t bg-white px-8 py-5 flex justify-between items-center shrink-0">
          <p className="text-slate-500 hidden sm:block">Verify all bill details before generating.</p>
          <div className="flex gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition flex-1 sm:flex-none font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="billForm"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition flex items-center justify-center gap-2 flex-1 sm:flex-none disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <FaSpinner className="animate-spin" />}
              Generate Bill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateBillModal;