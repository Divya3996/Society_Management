import { useState, useEffect } from "react";
import { FaBuilding, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { getSocietySettings, updateSocietySettings } from "../../services/settingsService";

function SocietySettings() {
  const [settings, setSettings] = useState({
    name: "Digital Society Heights",
    phone: "+91 98765 43210",
    email: "management@digitalsociety.com",
    address: "Block B, Tech Valley Road, Smart City - 400076",
    registrationNumber: "SOC/2026/MAH/88921",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await getSocietySettings();
        setSettings({
          name: saved.name || "",
          phone: saved.phone || "",
          email: saved.email || "",
          address: saved.address || "",
          registrationNumber: saved.registrationNumber || "",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load society settings.");
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateSocietySettings(settings);
      toast.success("Society settings saved successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save society settings.");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
          <FaBuilding />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Society Information</h2>
          <p className="text-slate-500">Configure public society details and contact information.</p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-slate-700">Society Name</label>
            <input
              type="text"
              name="name"
              value={settings.name}
              onChange={handleChange}
              placeholder="e.g. Digital Society Heights"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">Contact Number</label>
            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">Official Email</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              placeholder="management@society.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={settings.registrationNumber}
              onChange={handleChange}
              placeholder="SOC/2026/..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-slate-700">Society Address</label>
            <textarea
              rows="3"
              name="address"
              value={settings.address}
              onChange={handleChange}
              placeholder="Enter society full address..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            <FaSave />
            Save Society Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default SocietySettings;
