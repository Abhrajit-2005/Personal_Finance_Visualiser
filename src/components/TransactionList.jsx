"use client";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export default function TransactionList({ transactions, onDelete, onEdit }) {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-6">
                <h2 className="text-2xl font-bold">Transactions</h2>
                <p className="text-sm mt-2">No transactions yet.</p>
            </div>
        );
    }

    return (
        <div className="mt-10">
            <h2 className="text-5xl font-bold mb-4 text-center">Your Transactions</h2>
            <div className="space-y-2">
                {transactions.map((tx) => (
                    <div
                        key={tx._id}
                        className="flex justify-between items-center rounded-xl p-3 bg-gradient-to-br from-white/70 to-gray-100/50 backdrop-blur shadow hover:shadow-xl transition hover:scale-[1.01] border border-gray-300"
                    >
                        {/* left aligned: all info in one line */}
                        <div className="flex flex-wrap md:flex-nowrap gap-6 items-center text-lg md:text-base text-gray-800">
                            <span className="font-bold text-indigo-700">₹{tx.amount}</span>
                            <span className="truncate max-w-[150px] md:max-w-xs">{tx.description}</span>
                            <span className="text-gray-500 text-xs md:text-sm">
                                {new Date(tx.date).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </span>
                            <span className="text-purple-700 font-medium">({tx.category})</span>
                        </div>

                        {/* right aligned: action buttons */}
                        <div className="flex space-x-2">
                            <Button size="sm" onClick={() => onEdit(tx)}>
                                <Pencil className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => onDelete(tx._id)}>
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
