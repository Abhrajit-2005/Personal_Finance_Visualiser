// src/pages/api/transactions/index.js
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/lib/models/Transaction";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "GET") {
        const transactions = await Transaction.find().sort({ date: -1 });
        return res.status(200).json(transactions);
    }

    if (req.method === "POST") {
        try {
            const { amount, date, description } = req.body;
            const transaction = await Transaction.create({
                amount,
                date,
                description,
            });
            return res.status(201).json(transaction);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
}
