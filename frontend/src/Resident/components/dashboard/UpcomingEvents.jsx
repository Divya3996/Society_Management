import {
  FaCalendarAlt,
  FaFlag,
  FaUsers,
} from "react-icons/fa";

const events = [
  {
    title: "Society Meeting",
    date: "05 Aug 2026",
    time: "7:00 PM",
    icon: <FaUsers />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Independence Day Celebration",
    date: "15 Aug 2026",
    time: "9:00 AM",
    icon: <FaFlag />,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Health Check-up Camp",
    date: "22 Aug 2026",
    time: "10:00 AM",
    icon: <FaCalendarAlt />,
    color: "bg-green-100 text-green-600",
  },
];

function UpcomingEvents() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          📅 Upcoming Events
        </h2>

        <button className="text-blue-600 text-sm font-semibold hover:underline">
          View Calendar
        </button>

      </div>

      <div className="space-y-5">

        {events.map((event, index) => (

          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300"
          >

            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl ${event.color}`}
            >
              {event.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-slate-800">
                {event.title}
              </h3>

              <p className="text-sm text-slate-500">
                {event.date}
              </p>

            </div>

            <div className="text-right">

              <p className="font-semibold text-slate-700">
                {event.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default UpcomingEvents;