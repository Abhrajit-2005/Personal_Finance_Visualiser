"use client";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, X, DollarSign, Calendar, Tag, FileText } from "lucide-react";
import { useState } from "react";

// Edit Modal Component
function EditTransactionModal({ transaction, isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        amount: transaction?.amount || '',
        description: transaction?.description || '',
        category: transaction?.category || '',
        date: transaction?.date ? new Date(transaction.date).toISOString().split('T')[0] : ''
    });

    const handleSubmit = () => {
        if (!formData.amount || !formData.description || !formData.category || !formData.date) {
            return; // Basic validation
        }
        onSave({
            ...transaction,
            ...formData,
            amount: parseFloat(formData.amount)
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Edit Transaction</h3>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <DollarSign className="inline h-4 w-4 mr-1" />
                            Amount
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FileText className="inline h-4 w-4 mr-1" />
                            Description
                        </label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Tag className="inline h-4 w-4 mr-1" />
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        >
                            <option value="Food">Food</option>
                            <option value="Rent">Rent</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Other">Other</option>
                        </select>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="inline h-4 w-4 mr-1" />
                            Date
                        </label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            required
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4">
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full sm:w-auto flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                        >
                            Save Changes
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="w-full sm:w-auto flex-1"
                        >
                            Cancel
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function TransactionList({ transactions, onDelete, onEdit, onUpdate }) {
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async (updatedTransaction) => {
        await onUpdate(updatedTransaction); // 🔄 call backend update
        setEditingTransaction(null);
        setIsEditModalOpen(false);
    };

    if (!transactions || transactions.length === 0) {
        return (
            <div className="text-center py-16 px-4">
                <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-12 w-12 text-indigo-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">No Transactions Yet</h2>
                    <p className="text-gray-600">Start tracking your expenses by adding your first transaction.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Your Transactions
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:block">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-4 border-b border-gray-200">
                            <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700">
                                <div className="col-span-2">Amount</div>
                                <div className="col-span-4">Description</div>
                                <div className="col-span-2">Category</div>
                                <div className="col-span-2">Date</div>
                                <div className="col-span-2 text-center">Actions</div>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {transactions.map((tx, index) => (
                                <div
                                    key={tx._id}
                                    className={`px-8 py-6 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                        }`}
                                >
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-2">
                                            <span className="font-bold text-xl text-indigo-700">
                                                ₹ {tx.amount.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="col-span-4">
                                            <span className="text-gray-800 font-medium">{tx.description}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                                {tx.category}
                                            </span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-gray-600 text-sm">
                                                {new Date(tx.date).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <div className="col-span-2 flex justify-center space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleEditClick(tx)}
                                                className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-colors"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => onDelete(tx._id)}
                                                className="hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile & Tablet View */}
                <div className="lg:hidden space-y-4">
                    {transactions.map((tx) => (
                        <div
                            key={tx._id}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl font-bold text-indigo-700">
                                                ₹ {tx.amount.toLocaleString()}
                                            </span>
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                {tx.category}
                                            </span>
                                        </div>
                                        <p className="text-gray-800 font-medium text-lg mb-2">{tx.description}</p>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {new Date(tx.date).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-100">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEditClick(tx)}
                                        className="flex-1 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-colors"
                                    >
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => onDelete(tx._id)}
                                        className="flex-1 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Modal */}
            <EditTransactionModal
                transaction={editingTransaction}
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingTransaction(null);
                }}
                onSave={handleSaveEdit}
            />
        </>
    );
}