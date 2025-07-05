"use client";

import { Trash, Edit3 } from "lucide-react";

export default function BudgetList({ budgets, onEdit, onDelete }) {
    if (!budgets || budgets.length === 0) {
        return (
            <div className="rounded-2xl shadow-xl p-4 backdrop-blur bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
                No budgets set yet.
            </div>
        );
    }
    const handleDeleteBudget = async (id) => {
        await fetch(`/api/budgets?id=${id}`, {
            method: "DELETE",
        });
        mutateBudgets();
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgets.map((budget) => (
                <div
                    key={budget._id}
                    className="rounded-2xl p-4 shadow-xl backdrop-blur bg-gradient-to-br from-indigo-500/20 to-indigo-900/10 dark:from-teal-500/20 dark:to-teal-900/10 border border-white/30 dark:border-gray-700 hover:scale-[1.02] transition"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold text-indigo-700 dark:text-teal-400">
                                {budget.category}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                ₹ {budget.amount.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {budget.month}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="p-2 hover:bg-white/20 rounded"
                                onClick={() => onEdit(budget)}
                            >
                                <Edit3 className="text-indigo-600 dark:text-teal-400" size={20} />
                            </button>
                            <button
                                className="p-2 hover:bg-white/20 rounded"
                                onClick={() => onDelete(budget._id)}
                            >
                                <Trash className="text-red-500" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
