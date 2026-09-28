import { FaVoteYea, FaClock, FaCheckCircle } from "react-icons/fa";

const polls = [
  {
    id: 1,
    title: "Should we install CCTV cameras in the parking area?",
    description: "Vote on installing additional CCTV cameras for better security.",
    created: "05 Aug 2026",
    deadline: "12 Aug 2026",
    status: "Active",
    votes: "24",
  },
  {
    id: 2,
    title: "Preferred time for society meetings",
    description: "Choose the most convenient time for monthly society meetings.",
    created: "01 Aug 2026",
    deadline: "08 Aug 2026",
    status: "Active",
    votes: "31",
  },
  {
    id: 3,
    title: "New parking allocation system",
    description: "Vote on the proposed parking allocation system.",
    created: "20 Jul 2026",
    deadline: "30 Jul 2026",
    status: "Completed",
    votes: "42",
  },
  {
    id: 4,
    title: "Festival decoration budget",
    description: "Decide the proposed budget for upcoming festival decorations.",
    created: "15 Jul 2026",
    deadline: "22 Jul 2026",
    status: "Completed",
    votes: "38",
  },
];

function PollTable({ polls: filteredPolls = polls, onVote }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">
          Society Polls
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Participate in active society polls and view completed polls.
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Poll
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Created
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Deadline
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Votes
              </th>

              <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredPolls.map((poll) => (

              <tr
                key={poll.id}
                className="border-t border-slate-100 hover:bg-slate-50 transition"
              >

                {/* Poll */}
                <td className="px-6 py-5">

                  <div className="flex items-start gap-4">

                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <FaVoteYea />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {poll.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1 max-w-md">
                        {poll.description}
                      </p>
                    </div>

                  </div>

                </td>

                {/* Created */}
                <td className="px-6 py-5 text-sm text-slate-600">
                  {poll.created}
                </td>

                {/* Deadline */}
                <td className="px-6 py-5">

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <FaClock className="text-slate-400" />
                    {poll.deadline}
                  </div>

                </td>

                {/* Votes */}
                <td className="px-6 py-5 text-sm font-medium text-slate-700">
                  {poll.votes}
                </td>

                {/* Status */}
                <td className="px-6 py-5">

                  {poll.status === "Active" ? (

                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      <FaVoteYea />
                      Active
                    </span>

                  ) : (

                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                      <FaCheckCircle />
                      Completed
                    </span>

                  )}

                </td>

                {/* Action */}
                <td className="px-6 py-5 text-right">

                  {poll.status === "Active" ? (

                    <button
                      onClick={() => onVote && onVote(poll)}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                    >
                      Vote Now
                    </button>

                  ) : (

                    <span className="text-sm text-slate-400">
                      Closed
                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-100">

        {filteredPolls.map((poll) => (

          <div key={poll.id} className="p-5">

            <div className="flex gap-3">

              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FaVoteYea />
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-slate-800">
                  {poll.title}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {poll.description}
                </p>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

              <div>
                <p className="text-slate-400">Created</p>
                <p className="font-medium text-slate-700">
                  {poll.created}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Deadline</p>
                <p className="font-medium text-slate-700">
                  {poll.deadline}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Votes</p>
                <p className="font-medium text-slate-700">
                  {poll.votes}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Status</p>
                <p
                  className={
                    poll.status === "Active"
                      ? "font-medium text-green-600"
                      : "font-medium text-slate-500"
                  }
                >
                  {poll.status}
                </p>
              </div>

            </div>

            {poll.status === "Active" && (

              <button
                onClick={() => onVote && onVote(poll)}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Vote Now
              </button>

            )}

          </div>

        ))}

      </div>

      {filteredPolls.length === 0 && (

        <div className="py-12 text-center text-slate-500">
          No polls found.
        </div>

      )}

    </div>
  );
}

export default PollTable;