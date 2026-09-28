import { useState, useEffect } from "react";
import { getPolls, deletePoll, closePoll } from "../../services/pollService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import PollStats from "../components/PollStats";
import PollToolbar from "../components/PollToolbar";
import PollTable from "../components/PollTable";
import CreatePollModal from "../components/CreatePollModal";
import ConfirmDialog from "../../components/ConfirmDialog";

function Polls() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", status: "All Status", category: "All Categories" });
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null, title: "", message: "" });

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const data = await getPolls();
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
      (filters.status === "All Status" || (filters.status === "Completed" ? poll.status === "Closed" : poll.status === filters.status)) &&
      (filters.category === "All Categories" || poll.category === filters.category);
  });

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Poll",
      message: "Are you sure you want to delete this poll? All votes will also be removed.",
      confirmLabel: "Delete",
      onConfirm: async () => {
        setConfirmDialog((d) => ({ ...d, isOpen: false }));
        try {
          await deletePoll(id);
          toast.success("Poll deleted successfully");
          fetchPolls();
        } catch (error) {
          toast.error("Failed to delete poll");
        }
      },
    });
  };

  const handleClose = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: "Close Poll",
      message: "Are you sure you want to close this poll? Residents will no longer be able to vote.",
      confirmLabel: "Close Poll",
      confirmClass: "bg-orange-500 hover:bg-orange-600",
      onConfirm: async () => {
        setConfirmDialog((d) => ({ ...d, isOpen: false }));
        try {
          await closePoll(id);
          toast.success("Poll closed successfully");
          fetchPolls();
        } catch (error) {
          toast.error("Failed to close poll");
        }
      },
    });
  };

  // Compute stats from live data
  const stats = {
    total: polls.length,
    active: polls.filter((p) => p.status === "Active").length,
    completed: polls.filter((p) => p.status === "Closed").length,
    totalVotes: polls.reduce(
      (sum, p) => sum + (p.options?.reduce((s, o) => s + (o.votes || 0), 0) || 0),
      0
    ),
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Society Polls</h1>
        <p className="mt-2 text-slate-500">
          Create polls, collect resident votes and view live results.
        </p>
      </div>

      {/* Statistics */}
      <PollStats stats={stats} />

      {/* Toolbar */}
      <PollToolbar filters={filters} onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} onCreatePoll={() => setShowCreatePoll(true)} />

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : (
        <PollTable polls={filteredPolls} onDelete={handleDelete} onClose={handleClose} />
      )}

      {/* Modal */}
      <CreatePollModal
        isOpen={showCreatePoll}
        onClose={() => setShowCreatePoll(false)}
        onSuccess={() => {
          setShowCreatePoll(false);
          fetchPolls();
        }}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel || "Confirm"}
        confirmClass={confirmDialog.confirmClass}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((d) => ({ ...d, isOpen: false }))}
      />
    </>
  );
}

export default Polls;