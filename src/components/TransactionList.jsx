"use client";
import { Button } from "@/components/ui/button";

export default function TransactionList({ transactions, onDelete, onEdit }) {
    if (!transactions || transactions.length === 0) {
        return <p className="text-center text-gray-500">No transactions yet.</p>;
    }

    return (
        <div className="space-y-2">
            {transactions.map((tx) => (
                <div
                    key={tx._id}
                    className="flex justify-between items-center border rounded p-2"
                >
                    <div>
                        <p className="font-semibold">₹{tx.amount}</p>
                        <p className="text-sm text-gray-500">{tx.description}</p>
                        <p className="text-xs text-gray-400">{new Date(tx.date).toDateString()}</p>
                        <p className="text-xs text-indigo-600">Category: {tx.category}</p>
                    </div>
                    <div className="space-x-2">
                        <Button size="sm" onClick={() => onEdit(tx)}>
                            Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => onDelete(tx._id)}>
                            Delete
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
