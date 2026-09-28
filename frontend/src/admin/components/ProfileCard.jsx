import {
  FaCamera,
  FaCheckCircle,
  FaBuilding,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

function ProfileCard() {
  const { user } = useAuth();
  const initials = user?.name?.slice(0, 2).toUpperCase() || "AD";

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">

      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
            {initials}
          </div>
          <button
            className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition shadow"
            title="Change Photo"
          >
            <FaCamera />
          </button>
        </div>

        <h2 className="mt-5 text-2xl font-bold text-slate-800">
          {user?.name || "Admin"}
        </h2>

        <p className="text-slate-500">Society Administrator</p>

        <div className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
          <FaCheckCircle />
          Verified Account
        </div>
      </div>

      <div className="border-t my-8" />

      {/* Info */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <FaBuilding className="text-blue-600 shrink-0" />
          <div>
            <p className="text-xs text-slate-500">Society</p>
            <p className="font-semibold text-slate-800">Digital Society</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaEnvelope className="text-blue-600 shrink-0" />
          <div>
            <p className="text-xs text-slate-500">Email</p>
            <p className="font-semibold text-slate-800">{user?.email || "—"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaPhone className="text-blue-600 shrink-0" />
          <div>
            <p className="text-xs text-slate-500">Phone</p>
            <p className="font-semibold text-slate-800">{user?.phone || "—"}</p>
          </div>
        </div>
      </div>

      <div className="border-t my-8" />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-blue-50 p-4 text-center">
          <h3 className="text-2xl font-bold text-blue-700">Admin</h3>
          <p className="text-sm text-slate-500">Role</p>
        </div>
        <div className="rounded-2xl bg-green-50 p-4 text-center">
          <h3 className="text-2xl font-bold text-green-700">Active</h3>
          <p className="text-sm text-slate-500">Status</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;