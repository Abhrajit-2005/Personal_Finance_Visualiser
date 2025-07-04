import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TransactionForm({ onSubmit, initialData }) {
    const [amount, setAmount] = useState(initialData?.amount || "");
    const [date, setDate] = useState(initialData?.date || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            newErrors.amount = "Please enter a valid amount greater than zero";
        }

        if (!date) {
            newErrors.date = "Please select a date";
        }

        if (!description.trim()) {
            newErrors.description = "Description cannot be empty";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSubmit({ amount: Number(amount), date, description });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded shadow">
            <div>
                <label>Amount</label>
                <input
                    type="number"
                    className="border p-1 w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
            </div>
            <div>
                <label>Date</label>
                <input
                    type="date"
                    className="border p-1 w-full"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    className="border p-1 w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
            <Button type="submit">Save</Button>
        </form>
    );
}
