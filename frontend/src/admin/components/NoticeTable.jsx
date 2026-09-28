import { FaEdit, FaTrash, FaBullhorn } from "react-icons/fa";

function NoticeTable({ notices = [], onDelete, onEdit }) {
  if (notices.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center mt-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <FaBullhorn className="text-blue-300 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No notices yet</h3>
        <p className="text-slate-400 text-sm mt-1">Create a notice to broadcast information to residents.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-slate-700">
              <th className="px-6 py-4 text-left">Notice</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Priority</th>
              <th className="px-6 py-4 text-left">Published By</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {notices.map((notice) => (
              <tr
                key={notice._id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-semibold text-slate-800">{notice.title}</h4>
                      <p className="text-sm text-slate-500 line-clamp-1">{notice.description}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm">
                    {notice.category || "General"}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      notice.priority === "Urgent"
                        ? "bg-red-100 text-red-700"
                        : notice.priority === "Important"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {notice.priority || "Normal"}
                  </span>
                </td>

                <td className="px-6 py-5 text-slate-600 text-sm">
                  {notice.publishedBy?.name || "Admin"}
                </td>

                <td className="px-6 py-5 text-slate-600 text-sm">
                  {new Date(notice.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      notice.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {notice.isActive ? "Published" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(notice)}
                      title="Edit"
                      className="w-10 h-10 rounded-xl bg-green-100 text-green-600 hover:bg-green-200 transition flex items-center justify-center"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => onDelete(notice._id)}
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

export default NoticeTable;
