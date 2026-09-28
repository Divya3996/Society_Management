import { FaTrash, FaVoteYea } from "react-icons/fa";

function PollTable({ polls = [], onDelete }) {
  if (polls.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center mt-4">
        <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-4">
          <FaVoteYea className="text-purple-300 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No polls yet</h3>
        <p className="text-slate-400 text-sm mt-1">Create a poll to collect resident opinions.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-slate-700">Poll Title</th>
              <th className="px-6 py-4 text-left text-slate-700">Category</th>
              <th className="px-6 py-4 text-left text-slate-700">Start Date</th>
              <th className="px-6 py-4 text-left text-slate-700">End Date</th>
              <th className="px-6 py-4 text-center text-slate-700">Options</th>
              <th className="px-6 py-4 text-center text-slate-700">Status</th>
              <th className="px-6 py-4 text-center text-slate-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {polls.map((poll) => (
              <tr
                key={poll._id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-6 py-5">
                  <h4 className="font-semibold text-slate-800">{poll.question}</h4>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {poll.options?.length || 0} options
                  </p>
                </td>

                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                    {poll.category || "General"}
                  </span>
                </td>

                <td className="px-6 py-5 text-slate-600 text-sm">
                  {poll.startDate
                    ? new Date(poll.startDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : new Date(poll.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                </td>

                <td className="px-6 py-5 text-slate-600 text-sm">
                  {poll.expiresAt
                    ? new Date(poll.expiresAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>

                <td className="px-6 py-5 text-center font-semibold text-slate-700">
                  {poll.options?.length || 0}
                </td>

                <td className="px-6 py-5 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      poll.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : poll.status === "Closed"
                        ? "bg-slate-200 text-slate-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {poll.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onDelete(poll._id)}
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

export default PollTable;
