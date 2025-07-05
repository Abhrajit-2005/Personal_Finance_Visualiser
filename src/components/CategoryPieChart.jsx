"use client";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export default function CategoryPieChart({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return <p className="text-center text-gray-500">No data for pie chart.</p>;
    }

    // prepare category totals
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
        <div className="w-full flex justify-center">
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}
