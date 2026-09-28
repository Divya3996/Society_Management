function ResidentDashboardCard({
  title,
  value,
  subtitle,
  icon,
  bgColor,
  iconColor,
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {value}
          </h2>

          <p className="text-sm text-slate-500 mt-3">
            {subtitle}
          </p>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${bgColor} ${iconColor}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default ResidentDashboardCard;