import { useState } from 'react';
import { DollarSign, Calendar, Tag, FileText, TrendingUp, Sparkles } from 'lucide-react';

export default function TransactionForm({ onSubmit, initialData }) {
    const [amount, setAmount] = useState(initialData?.amount || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [date, setDate] = useState(initialData?.date?.slice(0, 10) || "");
    const [category, setCategory] = useState(initialData?.category || "Other");
    const [focusedField, setFocusedField] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !description || !date) {
            alert("Please fill in all required fields");
            return;
        }
        onSubmit({
            amount: parseFloat(amount),
            description,
            date,
            category,
        });
        if (!initialData) {
            setAmount("");
            setDescription("");
            setDate("");
            setCategory("Other");
        }
    };

    const categoryIcons = {
        'Food': '🍽️',
        'Rent': '🏠',
        'Entertainment': '🎬',
        'Utilities': '⚡',
        'Other': '📦'
    };

    const categoryColors = {
        'Food': 'from-orange-500 to-red-500',
        'Rent': 'from-blue-500 to-indigo-500',
        'Entertainment': 'from-pink-500 to-purple-500',
        'Utilities': 'from-yellow-500 to-orange-500',
        'Other': 'from-gray-500 to-slate-500'
    };

    return (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center rounded-3xl p-4">

            <form
                onSubmit={handleSubmit}
                className="relative z-10 rounded-3xl shadow-2xl p-8 backdrop-blur-xl bg-white/10 border border-white/20 space-y-8 w-full max-w-xl mx-auto"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
            >
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-4">
                        <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                        {initialData ? "Edit Transaction" : "Add Transaction"}
                    </h2>
                    <p className="text-white/60 text-sm">Track your expenses with precision</p>
                </div>

                {/* Amount Field */}
                <div className="relative group/field">
                    <div className="absolute -top-3 left-4 z-10">
                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            <DollarSign className="w-3 h-3 inline mr-1" />
                            Amount
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="e.g. 1200"
                            className={`w-full mt-2 p-4 pl-14 bg-white/5 backdrop-blur-sm border-2 ${focusedField === 'amount'
                                ? 'border-green-400 shadow-lg shadow-green-500/25'
                                : 'border-white/20'
                                } rounded-2xl text-white placeholder-white/50 focus:outline-none transition-all duration-300`}
                            onFocus={() => setFocusedField('amount')}
                            onBlur={() => setFocusedField('')}
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 font-bold text-lg">
                            ₹
                        </div>
                        {amount && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-400">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description Field */}
                <div className="relative group/field">
                    <div className="absolute -top-3 left-4 z-10">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            <FileText className="w-3 h-3 inline mr-1" />
                            Description
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g. Grocery shopping"
                            className={`w-full mt-2 p-4 pl-14 bg-white/5 backdrop-blur-sm border-2 ${focusedField === 'description'
                                ? 'border-blue-400 shadow-lg shadow-blue-500/25'
                                : 'border-white/20'
                                } rounded-2xl text-white placeholder-white/50 focus:outline-none transition-all duration-300`}
                            onFocus={() => setFocusedField('description')}
                            onBlur={() => setFocusedField('')}
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                            <FileText className="w-5 h-5" />
                        </div>
                        {description && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xs font-medium">
                                {description.length}/50
                            </div>
                        )}
                    </div>
                </div>

                {/* Date Field */}
                <div className="relative group/field">
                    <div className="absolute -top-3 left-4 z-10">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Date
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={`w-full mt-2 p-4 pl-14 bg-white/5 backdrop-blur-sm border-2 ${focusedField === 'date'
                                ? 'border-purple-400 shadow-lg shadow-purple-500/25'
                                : 'border-white/20'
                                } rounded-2xl text-white focus:outline-none transition-all duration-300`}
                            onFocus={() => setFocusedField('date')}
                            onBlur={() => setFocusedField('')}
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400">
                            <Calendar className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Category Field */}
                <div className="relative group/field">
                    <div className="absolute -top-3 left-4 flex items-center space-x-2 z-10">
                        <div className={`bg-gradient-to-r ${categoryColors[category]} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transition-all duration-300`}>
                            <Tag className="w-3 h-3 inline mr-1" />
                            Category
                        </div>
                    </div>
                    <div className="relative">
                        <select
                            className={`w-full mt-2 p-4 pl-14 bg-white/5 backdrop-blur-sm border-2 ${focusedField === 'category'
                                ? `border-${category === 'Food' ? 'orange' : category === 'Rent' ? 'blue' : category === 'Entertainment' ? 'pink' : category === 'Utilities' ? 'yellow' : 'gray'}-400 shadow-lg shadow-${category === 'Food' ? 'orange' : category === 'Rent' ? 'blue' : category === 'Entertainment' ? 'pink' : category === 'Utilities' ? 'yellow' : 'gray'}-500/25`
                                : 'border-white/20'
                                } rounded-2xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 appearance-none cursor-pointer`}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            onFocus={() => setFocusedField('category')}
                            onBlur={() => setFocusedField('')}
                        >
                            <option value="Food" className="bg-slate-800 text-white">🍽️ Food</option>
                            <option value="Rent" className="bg-slate-800 text-white">🏠 Rent</option>
                            <option value="Entertainment" className="bg-slate-800 text-white">🎬 Entertainment</option>
                            <option value="Utilities" className="bg-slate-800 text-white">⚡ Utilities</option>
                            <option value="Other" className="bg-slate-800 text-white">📦 Other</option>
                        </select>
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">
                            {categoryIcons[category]}
                        </div>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 pointer-events-none">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="relative w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex items-center justify-center space-x-2">
                            <span className="text-lg">
                                {initialData ? "Update" : "Add"} Transaction
                            </span>
                            <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center transition-transform duration-300">
                                <div className="w-2 h-2 bg-white rounded-full transition-transform duration-300"></div>
                            </div>
                        </div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 -translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </button>
                </div>

                {/* Quick Stats Preview */}
                {amount && (
                    <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between text-white/80 text-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>Amount: ₹{amount}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">{categoryIcons[category]}</span>
                                <span>{category}</span>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}