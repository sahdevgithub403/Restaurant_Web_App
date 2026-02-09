import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { adminAPI } from "../../services/api";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalRevenue: 24500,
    ordersToday: 52,
    pendingOrders: 8,
    avgOrderValue: 470,
    revenueChange: "+12.5%",
    ordersChange: "+5.2%",
    pendingChange: "-2.1%",
    avgChange: "+1.4%",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      if (response.data) {
        setStats((prev) => ({ ...prev, ...response.data }));
      }
    } catch (err) {
      console.error("Dashboard stats error:", err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    isPositive,
    prefix = "",
  }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-slate-600">
          <Icon size={20} />
        </div>
        <div
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
        >
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">
          {prefix}
          {typeof value === "number" ? value.toLocaleString() : value}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          change={stats.revenueChange}
          icon={DollarSign}
          isPositive={true}
          prefix="₹"
        />
        <StatCard
          title="Orders Today"
          value={stats.ordersToday}
          change={stats.ordersChange}
          icon={ShoppingBag}
          isPositive={true}
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          change={stats.pendingChange}
          icon={Layers}
          isPositive={false}
        />
        <StatCard
          title="Avg. Order Value"
          value={stats.avgOrderValue}
          change={stats.avgChange}
          icon={TrendingUp}
          isPositive={true}
          prefix="₹"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm min-h-[400px]">
          <h4 className="text-base font-semibold text-slate-800 mb-8">
            Sales Overview
          </h4>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[40, 65, 45, 80, 55, 95, 70, 85, 60, 40, 75, 55].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-orange-100 rounded-t-sm hover:bg-orange-200 transition-colors cursor-pointer"
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between px-4 mt-4 text-[10px] text-slate-400 font-medium">
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h4 className="text-base font-semibold text-slate-800 mb-6">
            Recent Activity
          </h4>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 border border-slate-100">
                  <ShoppingBag size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    Order #RD-72{i}
                  </p>
                  <p className="text-xs text-slate-400">4 minutes ago</p>
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  ₹{450 * i}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-medium">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
