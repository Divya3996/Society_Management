import { FaCalendarAlt } from "react-icons/fa";

function UpcomingEvents() {
  const events = [
    {
      title: "Society Meeting",
      date: "10 Jul 2026",
    },
    {
      title: "Tree Plantation",
      date: "15 Jul 2026",
    },
    {
      title: "Independence Day",
      date: "15 Aug 2026",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Upcoming Events
      </h2>

      <div className="space-y-5">
        {events.map((event, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b pb-4 last:border-none"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <FaCalendarAlt />
            </div>

            <div>
              <h3 className="font-semibold">
                {event.title}
              </h3>

              <p className="text-sm text-slate-500">
                {event.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEvents;
