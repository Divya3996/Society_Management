import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#10B981", "#F59E0B", "#3B82F6"];

function ReportCharts({ stats = {}, bills = [] }) {
  // Compute revenue data by grouping bills by month
  // Note: billMonth is typically "January 2026", "Feb 2026", etc.
  const revenueMap = {};
  bills.forEach((bill) => {
    if (bill.status === "Paid") {
      const month = bill.billMonth.substring(0, 3); // "Jan"
      revenueMap[month] = (revenueMap[month] || 0) + bill.amount;
    }
  });

  let revenueData = Object.keys(revenueMap).map(key => ({
    month: key,
    revenue: revenueMap[key]
  }));

  if (revenueData.length === 0) {
    revenueData = [
      { month: "Jan", revenue: 0 },
      { month: "Feb", revenue: 0 },
    ];
  }

  const complaintData = [
    { name: "Resolved", value: stats.resolvedComplaints || 0 },
    { name: "Pending", value: stats.pendingComplaints || 0 },
    { name: "In Progress", value: stats.inProgressComplaints || 0 },
  ].filter(d => d.value > 0);

  if (complaintData.length === 0) {
    complaintData.push({ name: "No Data", value: 1 });
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      {/* Revenue Chart */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Monthly Revenue</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Complaint Pie */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Complaint Status</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={complaintData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {complaintData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === "No Data" ? "#e2e8f0" : COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ReportCharts;