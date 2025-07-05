"use client";
import { ArrowDownRight, PieChart, Clock } from "lucide-react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

export default function SummaryCards({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="rounded-2xl p-4 shadow-xl backdrop-blur bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700"
                    >
                        <p className="text-gray-500 text-center">No data yet</p>
                    </div>
                ))}
            </div>
        );
    }

    const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);

    const categoryTotals = transactions.reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
        return acc;
    }, {});
    const biggestCategory = Object.entries(categoryTotals).sort(
        (a, b) => b[1] - a[1]
    )[0];

    const mostRecent = transactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    )[0];

    const highestExpense = Math.max(...transactions.map((t) => t.amount));

    const averageTransaction =
        transactions.length > 0 ? totalExpenses / transactions.length : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl p-6 shadow-xl backdrop-blur bg-gradient-to-br from-indigo-500/30 to-indigo-900/20 border border-white/30 hover:scale-105 transition">
                <div className="flex items-center space-x-3">
                    <ArrowDownRight className="text-indigo-600" size={32} />
                    <div>
                        <p className="text-gray-700 text-sm">Total Expenses</p>
                        <h2 className="text-2xl font-bold text-gray-900">
                            ₹ {totalExpenses.toFixed(2)}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl p-6 shadow-xl backdrop-blur bg-gradient-to-br from-yellow-500/30 to-yellow-900/20 border border-white/30 hover:scale-105 transition">
                <div className="flex items-center space-x-3">
                    <PieChart className="text-yellow-600" size={32} />
                    <div>
                        <p className="text-gray-700 text-sm">Top Category</p>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {biggestCategory
                                ? `${biggestCategory[0]} (₹${biggestCategory[1].toFixed(2)})`
                                : "N/A"}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl p-6 shadow-xl backdrop-blur bg-gradient-to-br from-pink-500/30 to-pink-900/20 border border-white/30 hover:scale-105 transition">
                <div className="flex items-center space-x-3">
                    <Clock className="text-pink-600" size={32} />
                    <div>
                        <p className="text-gray-700 text-sm">Most Recent</p>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {mostRecent ? mostRecent.description : "N/A"}
                        </h2>
                        <p className="text-xs text-gray-600">
                            {mostRecent ? mostRecent.date.slice(0, 10) : ""}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl p-6 shadow-xl backdrop-blur bg-gradient-to-br from-green-500/30 to-green-900/20 border border-white/30 hover:scale-105 transition">
                <p className="text-gray-700 text-sm mb-2">Transactions per Category</p>
                <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={Object.entries(categoryTotals).map(([cat, amt]) => ({
                                category: cat,
                                amount: amt,
                            }))}
                        >
                            <Bar dataKey="amount" fill="#16a34a" radius={[4, 4, 0, 0]} />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="rounded bg-white/80 p-2 text-xs shadow backdrop-blur">
                                                <p className="text-gray-800 font-semibold">{data.category}</p>
                                                <p>₹ {data.amount.toFixed(2)}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rounded-2xl p-6 shadow-xl backdrop-blur bg-gradient-to-br from-red-500/30 to-red-900/20 border border-white/30 hover:scale-105 transition">
                <div>
                    <p className="text-gray-700 text-sm mb-2">Highest Expense</p>
                    <h2 className="text-2xl font-bold text-gray-900">
                        ₹ {highestExpense.toFixed(2)}
                    </h2>
                </div>
            </div>

            <div className="rounded-2xl p-6 shadow-xl backdrop-blur bg-gradient-to-br from-purple-500/30 to-purple-900/20 border border-white/30 hover:scale-105 transition">
                <p className="text-gray-700 text-sm mb-2">Avg. Transaction</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    ₹ {averageTransaction.toFixed(2)}
                </h2>
                <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={transactions
                                .slice()
                                .sort((a, b) => new Date(a.date) - new Date(b.date))
                                .map((t) => ({
                                    date: t.date.slice(0, 10),
                                    amount: t.amount,
                                }))}
                        >
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#9333ea"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
