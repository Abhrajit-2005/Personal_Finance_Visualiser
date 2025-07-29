import { useState } from 'react';
import { DollarSign, Calendar, Tag, Sparkles } from 'lucide-react';

export default function BudgetForm({ onSubmit, initialData }) {
    const [category, setCategory] = useState(initialData?.category || "Food");
    const [amount, setAmount] = useState(initialData?.amount || "");
    const [month, setMonth] = useState(initialData?.month || new Date().toISOString().slice(0, 7));
    const [focusedField, setFocusedField] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !amount || !month) {
            alert("Please fill all fields");
            return;
        }
        onSubmit({
            category,
            amount: parseFloat(amount),
            month,
        });
        if (!initialData) {
            setCategory("Other");
            setAmount("");
            setMonth(new Date().toISOString().slice(0, 7));
        }
    };

    const categoryIcons = {
        'Food': '🍽️',
        'Rent': '🏠',
        'Entertainment': '🎬',
        'Utilities': '⚡',
        'Other': '📦'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">

            <form
                onSubmit={handleSubmit}
                className="relative rounded-3xl shadow-2xl p-8 backdrop-blur-xl bg-white/10 border border-white/20 space-y-8 w-full max-w-xl mx-auto transition-all duration-500 hover:shadow-purple-500/25 hover:scale-[1.02] group"

            >
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl mb-4 group-hover:rotate-12 transition-transform duration-300">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                        {initialData ? "Update Monthly Budget" : "Set Monthly Budget"}
                    </h2>
                    <p className="text-white/60 text-sm">Manage your finances with style</p>
                </div>

                {/* Category Field */}
                <div className="relative group/field">
                    <div className="absolute -top-3 left-4 flex items-center space-x-2 z-10">
                        <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            <Tag className="w-3 h-3 inline mr-1" />
                            Category
                        </div>
                    </div>
                    <div className="relative">
                        <select
                            className={`w-full mt-2 p-4 pl-14 bg-white/5 backdrop-blur-sm border-2 ${focusedField === 'category'
                                ? 'border-purple-400 shadow-lg shadow-purple-500/25'
                                : 'border-white/20 hover:border-white/40'
                                } rounded-2xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 appearance-none cursor-pointer group-hover/field:bg-white/10`}
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
                            placeholder="Enter budget amount"
                            className={`w-full mt-2 p-4 pl-14 bg-white/5 backdrop-blur-sm border-2 ${focusedField === 'amount'
                                ? 'border-green-400 shadow-lg shadow-green-500/25'
                                : 'border-white/20 hover:border-white/40'
                                } rounded-2xl text-white placeholder-white/50 focus:outline-none transition-all duration-300 group-hover/field:bg-white/10`}
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

                {/* Month Field */}
                <div className="relative group/field">
                    <div className="absolute -top-3 left-4 z-10">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Month
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="month"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            className={`w-full mt-2 p-4 pl-14 bg-white/5 backdrop-blur-sm border-2 ${focusedField === 'month'
                                ? 'border-blue-400 shadow-lg shadow-blue-500/25'
                                : 'border-white/20 hover:border-white/40'
                                } rounded-2xl text-white focus:outline-none transition-all duration-300 group-hover/field:bg-white/10`}
                            onFocus={() => setFocusedField('month')}
                            onBlur={() => setFocusedField('')}
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                            <Calendar className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="relative w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 overflow-hidden group/btn"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex items-center justify-center space-x-2">
                            <span className="text-lg">
                                {initialData ? "Update Budget" : "Set Budget"}
                            </span>
                            <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center group-hover/btn:rotate-180 transition-transform duration-300">
                                <div className="w-2 h-2 bg-white rounded-full group-hover/btn:scale-150 transition-transform duration-300"></div>
                            </div>
                        </div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </button>
                </div>
            </form>
        </div>
    );
}