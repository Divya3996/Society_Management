import { useState, useEffect } from "react";
import { getPolls, votePoll } from "../../services/pollService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import PollStats from "../components/polls/PollStats";
import PollToolbar from "../components/polls/PollToolbar";
import PollList from "../components/polls/PollList";

function Polls() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", status: "All" });
  const [submittingVote, setSubmittingVote] = useState(null); // id of poll being voted

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const data = await getPolls();
      // Residents see Active and Closed polls (no drafts). Assuming backend returns only what's appropriate or we filter here.
      // Usually all returned polls are valid to view.
      setPolls(data);
    } catch (error) {
      toast.error("Failed to load polls");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const filteredPolls = polls.filter((poll) => {
    const search = filters.search.toLowerCase();
    return (!search || [poll.question, poll.category].some((value) => String(value || "").toLowerCase().includes(search))) &&
      (filters.status === "All" || (filters.status === "Completed" ? poll.status === "Closed" : poll.status === filters.status));
  });

  const handleVote = async (pollId, optionIndex) => {
    setSubmittingVote(pollId);
    try {
      await votePoll(pollId, optionIndex);
      toast.success("Vote cast successfully!");
      fetchPolls();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cast vote");
    } finally {
      setSubmittingVote(null);
    }
  };

  // Compute stats from live data
  const stats = {
    total: polls.length,
    active: polls.filter(p => p.status === "Active").length,
    completed: polls.filter(p => p.status === "Closed").length,
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Society Polls</h1>
        <p className="text-slate-500 mt-2">
          Participate in community decisions by casting your vote on active polls.
        </p>
      </div>

      {/* Statistics */}
      <PollStats stats={stats} />

      {/* Toolbar */}
      <div className="mt-8">
        <PollToolbar filters={filters} onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} />
      </div>

      {/* Poll List */}
      <div className="mt-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : (
          <PollList
            polls={filteredPolls}
            onVote={handleVote}
            submittingVote={submittingVote}
          />
        )}
      </div>
    </>
  );
}

export default Polls;