import { FaEdit, FaTrash, FaUserTie } from "react-icons/fa";

function StaffTable({ staff = [], onDelete, onEdit }) {
  if (staff.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center mt-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <FaUserTie className="text-blue-300 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No staff members yet</h3>
        <p className="text-slate-400 text-sm mt-1">Add staff members to manage society operations.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-slate-700">Staff Member</th>
              <th className="px-6 py-4 text-left text-slate-700">Role</th>
              <th className="px-6 py-4 text-left text-slate-700">Phone</th>
              <th className="px-6 py-4 text-center text-slate-700">Shift</th>
              <th className="px-6 py-4 text-center text-slate-700">Status</th>
              <th className="px-6 py-4 text-center text-slate-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {staff.map((member, index) => (
              <tr
                key={member._id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                      {member.name?.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{member.name}</h4>
                      <p className="text-sm text-slate-500">{member.email || "—"}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold">
                    {member.role || "Staff Member"}
                  </span>
                </td>

                <td className="px-6 py-5 text-slate-600">{member.phone || "—"}</td>

                <td className="px-6 py-5 text-center text-slate-600">{member.shift || "General"}</td>

                <td className="px-6 py-5 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      member.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(member)}
                      title="Edit"
                      className="w-10 h-10 rounded-xl bg-green-100 text-green-600 hover:bg-green-200 transition flex items-center justify-center"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(member._id)}
                      title="Delete"
                      className="w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffTable;
