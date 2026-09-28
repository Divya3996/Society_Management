import { useState, useEffect } from "react";
import { getNotices } from "../../services/noticeService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import NoticeStats from "../components/notices/NoticeStats";
import NoticeToolbar from "../components/notices/NoticeToolbar";
import NoticeList from "../components/notices/NoticeList";
import NoticeDetailsModal from "../components/notices/NoticeDetailsModal";

function Notice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", category: "All Categories", priority: "All Priority" });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const data = await getNotices();
        // Residents only see active notices
        const activeNotices = data.filter(n => n.isActive);
        setNotices(activeNotices);
      } catch (error) {
        toast.error("Failed to load notices");
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const filteredNotices = notices.filter((notice) => {
    const search = filters.search.toLowerCase();
    return (!search || [notice.title, notice.description].some((value) => String(value || "").toLowerCase().includes(search))) &&
      (filters.category === "All Categories" || notice.category === filters.category) &&
      (filters.priority === "All Priority" || notice.priority === filters.priority);
  });

  const handleReadMore = (notice) => {
    setSelectedNotice(notice);
    setShowDetailsModal(true);
  };

  // Compute stats from live data
  const stats = {
    total: notices.length,
    pinned: notices.filter(n => n.priority === "Urgent").length,
    new: notices.filter(n => {
      // Last 7 days
      return new Date(n.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    }).length
  };

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Society Notices</h1>
        <p className="text-slate-500 mt-2">
          Stay updated with important announcements, maintenance schedules and community events.
        </p>
      </div>

      {/* Statistics */}
      <NoticeStats stats={stats} />

      {/* Toolbar */}
      <div className="mt-8">
        <NoticeToolbar filters={filters} onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))} />
      </div>

      {/* Notice List */}
      <div className="mt-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : (
          <NoticeList notices={filteredNotices} onReadMore={handleReadMore} />
        )}
      </div>

      {/* Notice Details */}
      <NoticeDetailsModal
        isOpen={showDetailsModal}
        notice={selectedNotice}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedNotice(null);
        }}
      />
    </>
  );
}

export default Notice;
