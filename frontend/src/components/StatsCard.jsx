function StatsCard({ title, value, icon, color }) {
  return (
    <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-stone-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-stone-800">
            {value}
          </h2>
        </div>

        <div className={`${color} p-3 rounded-xl text-white`}>
          {icon}
        </div>

      </div>

    </div>
  )
}

export default StatsCard