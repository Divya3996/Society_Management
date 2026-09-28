import { useEffect, useState } from "react";
import { FaSpinner, FaTimes, FaVoteYea } from "react-icons/fa";
import { toast } from "react-toastify";
import { votePoll } from "../../../services/pollService";
import { publishNotification } from "../../../services/notificationStore";

function VotePollModal({ isOpen, onClose, poll, onSuccess }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setSelectedOption(""), [isOpen, poll?._id]);

  if (!isOpen || !poll) return null;

  const options = poll.options || [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOption) {
      toast.error("Please select an option.");
      return;
    }

    setSubmitting(true);
    try {
      await votePoll(poll._id, Number(selectedOption));
      toast.success("Your vote has been submitted successfully!");
      publishNotification({
        title: "Vote submitted",
        message: `Your response to "${poll.question}" was recorded.`,
        path: "/resident/polls",
        type: "success",
      });
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not submit your vote.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
              <FaVoteYea className="text-xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Cast Your Vote
              </h2>

              <p className="text-blue-100 text-sm">
                Your opinion matters
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-white/20 flex items-center justify-center transition"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6">

          <h3 className="text-lg font-bold text-slate-800">
            {poll.question}
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            Choose one option below. Your vote cannot be changed after submission.
          </p>

          <div className="mt-6 space-y-3">

            <p className="font-semibold text-slate-700 mb-3">
              Select your answer:
            </p>

            {options.map((option, index) => (

              <label
                key={option._id || index}
                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${
                  selectedOption === String(index)
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >

                <input
                  type="radio"
                  name="pollOption"
                  value={index}
                  checked={selectedOption === String(index)}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-5 h-5 accent-blue-600"
                />

                <span className="font-medium text-slate-700">
                  {option.text || option}
                </span>

              </label>

            ))}

          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
            >
              {submitting && <FaSpinner className="mr-2 inline animate-spin" />} Submit Vote
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default VotePollModal;
