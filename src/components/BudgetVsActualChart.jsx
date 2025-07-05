"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BudgetVsActualChart({ budgets, transactions, selectedMonth }) {
    if (!budgets || budgets.length === 0 || !transactions) {
        return (
            <div className="rounded-2xl shadow-xl p-4 backdrop-blur bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
                No data available.
            </div>
        );
    }

    const monthBudgets = budgets.filter((b) => b.month === selectedMonth);
    const data = monthBudgets.map((b) => {
        const actual = transactions
            .filter((tx) => tx.category === b.category && tx.date.slice(0, 7) === b.month)
            .reduce((sum, tx) => sum + tx.amount, 0);
        return {
            category: b.category,
            Budget: b.amount,
            Actual: actual
        };
    });

    return (
        <div className="rounded-2xl shadow-xl p-4 backdrop-blur bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-indigo-600 dark:text-teal-400">Budget vs Actual - {selectedMonth}</h2>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.7)",
                            color: "#fff",
                            borderRadius: "0.5rem",
                            border: "none"
                        }}
                    />
                    <Legend />
                    <Bar dataKey="Budget" fill="#8884d8" />
                    <Bar dataKey="Actual" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
