"use client";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#14b8a6", "#f59e0b", "#ef4444", "#a855f7"];

export default function CategoryPieChart({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="text-center py-16 px-4">
                <div className="max-w-md mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">No Data Available</h2>
                    <p className="text-gray-600">Start tracking your expenses to see monthly trends.</p>
                </div>
            </div>
        );
    }

    const data = transactions.reduce((acc, tx) => {
        const found = acc.find((d) => d.name === tx.category);
        if (found) {
            found.value += tx.amount;
        } else {
            acc.push({ name: tx.category, value: tx.amount });
        }
        return acc;
    }, []);

    return (
        <div className="rounded-2xl shadow-xl p-4 backdrop-blur bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700 w-full">
            <h2 className="text-xl font-bold mb-4 text-indigo-600 dark:text-teal-400">
                Expenses by Category
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={50}
                        paddingAngle={5}
                        cornerRadius={10}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(253, 2, 2, 0.64)",
                            color: "#fff",
                            borderRadius: "0.5rem",
                            border: "none",
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        wrapperStyle={{
                            fontSize: "0.8rem",
                            color: "#334155",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
