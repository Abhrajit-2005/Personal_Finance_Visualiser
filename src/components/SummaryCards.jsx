"use client";
import { Card, CardContent } from "@/components/ui/card";

export default function SummaryCards({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="text-center text-gray-500">No summary data available.</div>
        );
    }

    const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);

    const mostRecent = transactions
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold">Total Expenses</h2>
                    <p className="text-2xl font-bold text-red-600">₹{totalExpenses}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold">Most Recent</h2>
                    <p>{mostRecent.description}</p>
                    <p className="text-sm text-gray-500">
                        {new Date(mostRecent.date).toDateString()}
                    </p>
                    <p className="text-sm text-indigo-600">₹{mostRecent.amount}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4">
                    <h2 className="text-lg font-semibold">Number of Transactions</h2>
                    <p className="text-2xl font-bold">{transactions.length}</p>
                </CardContent>
            </Card>
        </div>
    );
}
