// src/components/BudgetForm.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BudgetForm({ onSubmit, initialData }) {
    const [category, setCategory] = useState(initialData?.category || "Food");
    const [amount, setAmount] = useState(initialData?.amount || "");
    const [month, setMonth] = useState(initialData?.month || new Date().toISOString().slice(0, 7));

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
        // clear form if adding new
        if (!initialData) {
            setCategory("Other");
            setAmount("");
            setMonth(new Date().toISOString().slice(0, 7));
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl shadow-xl p-6 backdrop-blur bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700 space-y-4 w-full max-w-full"
        >
            <h2 className="text-xl font-bold mb-2 text-indigo-600 dark:text-teal-400">Set Monthly Budget</h2>
            <div>
                <Label>Category</Label>
                <select
                    className="mt-2 border rounded p-2 w-full dark:bg-gray-900 dark:border-gray-700"
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
            <div>
                <Label>Budget Amount (₹)</Label>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-2"
                />
            </div>
            <div>
                <Label>Month</Label>
                <Input
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="mt-2"
                />
            </div>
            <Button type="submit">
                {initialData ? "Update Budget" : "Set Budget"}
            </Button>
        </form>
    );
}
