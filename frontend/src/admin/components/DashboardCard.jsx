function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  bgColor,
  iconColor,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-3">
            {value}
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            {subtitle}
          </p>

        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${bgColor} ${iconColor}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default DashboardCard;