// src/app/api/budgets/route.js
import dbConnect from "@/lib/dbConnect";
import Budget from "@/lib/models/Budget";


export default async function handler(req, res) {
    await dbConnect();
    if (req.method === "GET") {
        const budgets = await Budget.find();
        return res.status(200).json(budgets);
    }
    if (req.method === "POST") {
        try {
            const data = req.body;
            const budget = await Budget.create(data);
            return res.status(201).json(budget);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
}

