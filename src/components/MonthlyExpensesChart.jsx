"use client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function MonthlyBarChart({ data }) {
    return (
        <div className="rounded-2xl shadow-xl p-4 backdrop-blur bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-indigo-600 dark:text-teal-400">Monthly Expenses</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(100,100,100,0.2)"
                    />
                    <XAxis
                        dataKey="month"
                        stroke="#8884d8"
                        tick={{ fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                        stroke="#8884d8"
                        tick={{ fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.7)",
                            color: "#fff",
                            borderRadius: "0.5rem",
                            border: "none",
                        }}
                    />
                    <Bar
                        dataKey="total"
                        fill="#6366f1"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
