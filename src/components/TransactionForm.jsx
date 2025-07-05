"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";


export default function TransactionForm({ onSubmit, initialData }) {
    const [amount, setAmount] = useState(initialData?.amount || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [date, setDate] = useState(initialData?.date?.slice(0, 10) || "");
    const [category, setCategory] = useState(initialData?.category || "Other");

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

    return (
        <div className="backdrop-blur-md bg-white/20 dark:bg-gray-800/20 rounded-2xl shadow-xl p-6 border border-white/30 dark:border-gray-700 transition hover:shadow-2xl">
            <h2 className="text-2xl font-extrabold text-indigo-600 dark:text-teal-400 mb-4 tracking-tight">
                {initialData ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-slate-800 dark:text-slate-200">
                <div className="space-y-1">
                    <Label className="font-semibold">Amount (₹)</Label>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. 1200"
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400 transition"
                    />
                </div>
                <div className="space-y-1">
                    <Label className="font-semibold">Description</Label>
                    <Input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Grocery shopping"
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400 transition"
                    />
                </div>
                <div className="space-y-1">
                    <Label className="font-semibold">Date</Label>
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-white/40 dark:bg-gray-900/40 backdrop-blur rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400 transition"
                    />
                </div>
                <div className="space-y-1">
                    <Label className="font-semibold">Category</Label>
                    <select
                        className="w-full bg-white/40 dark:bg-gray-900/40 backdrop-blur rounded-xl border border-slate-300 dark:border-slate-700 p-2 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400 transition"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="text-right">
                    <Button
                        type="submit"
                        className="bg-indigo-600 dark:bg-teal-500 hover:bg-indigo-700 dark:hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-xl transition"
                    >
                        {initialData ? "Update" : "Add"} Transaction
                    </Button>
                </div>
            </form>
        </div>
    );
}
