"use client";

import { useState } from "react";
import { Trash, Edit3, Calendar, DollarSign, X, Save } from "lucide-react";

export default function BudgetList({ transactions, budgets, onEdit, onDelete, onUpdate }) {
    const [editingBudget, setEditingBudget] = useState(null);
    const [editForm, setEditForm] = useState({
        category: '',
        amount: '',
        month: ''
    });
    console.log(transactions, budgets);


    if (!budgets || budgets.length === 0) {
        return (
            <div className="relative overflow-hidden rounded-3xl shadow-2xl p-8 backdrop-blur-lg bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-teal-500/10 border border-white/20 dark:border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 via-blue-400/5 to-teal-400/5 animate-pulse"></div>
                <div className="relative text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                        <DollarSign className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        No Budgets Yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Create your first budget to start tracking your spending goals
                    </p>
                </div>
            </div>
        );
    }

    const handleEdit = (budget) => {
        setEditingBudget(budget);
        setEditForm({
            category: budget.category,
            amount: budget.amount.toString(),
            month: budget.month
        });
    };

    const handleSaveEdit = async () => {
        if (onUpdate && editForm.category && editForm.amount && editForm.month) {
            try {
                const updatedBudget = {
                    ...editingBudget,
                    category: editForm.category,
                    amount: parseFloat(editForm.amount),
                    month: editForm.month
                };

                // console.log('Updating budget:', updatedBudget);

                await onUpdate(updatedBudget); // ✅ Call the actual update function

                setEditingBudget(null);
                setEditForm({ category: '', amount: '', month: '' });

                console.log('Budget update completed successfully');
            } catch (error) {
                console.error('Failed to update budget:', error);
                alert('Failed to update budget: ' + error.message);
            }
        }
    };


    const handleCancelEdit = () => {
        setEditingBudget(null);
        setEditForm({ category: '', amount: '', month: '' });
    };

    const getBudgetProgress = (budget) => {

        return Math.floor(Math.random() * 100);
    };

    const getProgressColor = (progress) => {
        if (progress <= 50) return 'from-green-400 to-emerald-500';
        if (progress <= 80) return 'from-yellow-400 to-orange-500';
        return 'from-red-400 to-red-600';
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budgets.map((budget) => {
                    const progress = getBudgetProgress(budget);
                    const progressColor = getProgressColor(progress);

                    return (
                        <div
                            key={budget._id}
                            className="group relative overflow-hidden rounded-3xl shadow-2xl backdrop-blur-lg bg-gradient-to-br from-white/30 via-white/20 to-white/10 dark:from-gray-800/40 dark:via-gray-800/30 dark:to-gray-800/20 border border-white/30 dark:border-gray-700/50 hover:scale-[1.02] hover:shadow-3xl transition-all duration-300"
                        >
                            {/* Animated background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Glowing border effect */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>

                            <div className="relative p-6">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"></div>
                                            <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400 bg-clip-text text-transparent">
                                                {budget.category}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                                            ₹ {budget.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </div>

                                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                            <Calendar size={14} />
                                            {budget.month}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            className="p-2 rounded-xl bg-white/20 dark:bg-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/50 backdrop-blur-sm border border-white/20 dark:border-gray-600/30 transition-all duration-200 hover:scale-110"
                                            onClick={() => handleEdit(budget)}
                                        >
                                            <Edit3 className="text-indigo-600 dark:text-indigo-400" size={18} />
                                        </button>
                                        <button
                                            className="p-2 rounded-xl bg-white/20 dark:bg-gray-700/30 hover:bg-red-500/20 backdrop-blur-sm border border-white/20 dark:border-gray-600/30 transition-all duration-200 hover:scale-110"
                                            onClick={() => onDelete(budget._id)}
                                        >
                                            <Trash className="text-red-500" size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Spent</span>
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">{progress}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${progressColor} transition-all duration-1000 ease-out`}
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        ₹{((budget.amount * progress) / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })} of ₹{budget.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Edit Modal */}
            {editingBudget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={handleCancelEdit}
                    ></div>

                    {/* Modal */}
                    <div className="relative w-full max-w-md mx-auto">
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 border border-white/30 dark:border-gray-700/50">
                            {/* Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-teal-500/5"></div>

                            <div className="relative p-6">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 dark:from-indigo-400 dark:via-purple-400 dark:to-teal-400 bg-clip-text text-transparent">
                                        Edit Budget
                                    </h2>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <X size={20} className="text-gray-600 dark:text-gray-400" />
                                    </button>
                                </div>

                                {/* Form */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Category
                                        </label>

                                        <select
                                            value={editForm.category}
                                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm transition-all"
                                        >
                                            <option value="Food">Food</option>
                                            <option value="Rent">Rent</option>
                                            <option value="Entertainment">Entertainment</option>
                                            <option value="Utilities">Utilities</option>
                                            <option value="Other">Other</option>
                                        </select>

                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Amount (₹)
                                        </label>
                                        <input
                                            type="number"
                                            value={editForm.amount}
                                            onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm transition-all"
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Month
                                        </label>
                                        <input
                                            type="month"
                                            value={editForm.month}
                                            onChange={(e) => setEditForm({ ...editForm, month: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm transition-all"
                                        />
                                    </div>

                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mt-8">
                                    <button
                                        onClick={handleCancelEdit}
                                        className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveEdit}
                                        disabled={!editForm.category || !editForm.amount || !editForm.month}
                                        className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}