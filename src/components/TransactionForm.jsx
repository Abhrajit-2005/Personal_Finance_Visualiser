"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TransactionForm({ onSubmit, initialData }) {
    const [amount, setAmount] = useState(initialData?.amount || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [date, setDate] = useState(initialData?.date?.slice(0, 10) || "");
    const [category, setCategory] = useState(initialData?.category || "Other");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !description || !date) {
            alert("Please fill all fields");
            return;
        }
        onSubmit({
            amount: parseFloat(amount),
            description,
            date,
            category,
        });
        // clear form if adding (not editing)
        if (!initialData) {
            setAmount("");
            setDescription("");
            setDate("");
            setCategory("Other");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Amount</Label>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div>
                <Label>Description</Label>
                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <Label>Date</Label>
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <Label>Category</Label>
                <select
                    className="border rounded p-2 w-full"
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
            <Button type="submit">
                {initialData ? "Update" : "Add"} Transaction
            </Button>
        </form>
    );
}
