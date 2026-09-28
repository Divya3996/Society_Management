import { FaVoteYea, FaSpinner } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";

function PollList({ polls = [], onVote, submittingVote }) {
  const { user } = useAuth();

  if (polls.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <FaVoteYea className="text-blue-300 text-3xl" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700">No polls active</h3>
        <p className="text-slate-400 text-sm mt-1">There are no polls available right now.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {polls.map((poll) => {
        const hasVoted = poll.hasVoted || false;
        const isActive = poll.status === "Active";
        const totalVotes = poll.options?.reduce((sum, opt) => sum + (opt.votes || 0), 0) || 0;

        return (
          <div
            key={poll._id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                {poll.category || "General"}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {poll.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-4">{poll.question}</h3>

            <div className="space-y-3 mb-6 flex-1">
              {poll.options?.map((option, index) => {
                const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                
                return (
                  <div key={index} className="relative">
                    <button
                      onClick={() => !hasVoted && isActive && onVote(poll._id, index)}
                      disabled={hasVoted || !isActive || submittingVote === poll._id}
                      className={`w-full relative z-10 flex justify-between items-center px-4 py-3 rounded-xl border transition-all ${
                        hasVoted || !isActive
                          ? "border-slate-200 bg-transparent text-slate-700"
                          : "border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700"
                      }`}
                    >
                      <span className="font-medium text-left">{option.text}</span>
                      {(hasVoted || !isActive) && (
                        <span className="font-bold text-slate-800">{percentage}%</span>
                      )}
                    </button>
                    {(hasVoted || !isActive) && (
                      <div
                        className="absolute top-0 left-0 h-full bg-blue-50 rounded-xl z-0 transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-500 font-medium">
                {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
              </p>
              {submittingVote === poll._id && (
                <FaSpinner className="animate-spin text-blue-600" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PollList;
