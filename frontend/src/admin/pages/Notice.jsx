import { useState, useEffect } from "react";
import { getNotices, deleteNotice } from "../../services/noticeService";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

import NoticeStats from "../components/NoticeStats";
import NoticeToolbar from "../components/NoticeToolbar";
import NoticeTable from "../components/NoticeTable";
import CreateNoticeModal from "../components/CreateNoticeModal";
import ConfirmDialog from "../../components/ConfirmDialog";

function Notice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", category: "All Categories", priority: "All Priorities" });
  const [showCreateNotice, setShowCreateNotice] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, onConfirm: null });

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const data = await getNotices();
      setNotices(data);
    } catch (error) {
      toast.error("Failed to load notices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const filteredNotices = notices.filter((notice) => {
    const search = filters.search.toLowerCase();
    return (!search || [notice.title, notice.description].some((value) => String(value || "").toLowerCase().includes(search))) &&
      (filters.category === "All Categories" || notice.category === filters.category) &&
      (filters.priority === "All Priorities" || notice.priority === filters.priority);
  });

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      onConfirm: async () => {
        setConfirmDialog((d) => ({ ...d, isOpen: false }));
        try {
          await deleteNotice(id);
          toast.success("Notice deleted successfully");
          fetchNotices();
        } catch (error) {
          toast.error("Failed to delete notice");
        }
      },
    });
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setShowCreateNotice(true);
  };

  // Compute stats from live data
  const stats = {
    total: notices.length,
    active: notices.filter((n) => n.isActive).length,
    pinned: notices.filter((n) => n.priority === "Urgent").length,
    scheduled: notices.filter((n) => !n.isActive).length,
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Notice Board</h1>
        <p className="mt-2 text-slate-500">
          Create, publish and manage society notices for all residents.
        </p>
      </div>

      {/* Statistics */}
      <NoticeStats stats={stats} />

      {/* Toolbar */}
      <NoticeToolbar
        filters={filters}
        onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
        onCreateNotice={() => {
          setEditingNotice(null);
          setShowCreateNotice(true);
        }}
      />

      {/* Notice Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      ) : (
        <NoticeTable notices={filteredNotices} onDelete={handleDelete} onEdit={handleEdit} />
      )}

      {/* Create/Edit Notice Modal */}
      <CreateNoticeModal
        isOpen={showCreateNotice}
        onClose={() => {
          setShowCreateNotice(false);
          setEditingNotice(null);
        }}
        notice={editingNotice}
        onSuccess={() => {
          setShowCreateNotice(false);
          setEditingNotice(null);
          fetchNotices();
        }}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Notice"
        message="Are you sure you want to delete this notice? Residents will no longer see it."
        confirmLabel="Delete"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((d) => ({ ...d, isOpen: false }))}
      />
    </>
  );
}

export default Notice;
