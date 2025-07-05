import dbConnect from "@/lib/dbConnect";
import Budget from "@/lib/models/Budget";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const budgets = await Budget.find();
                return res.status(200).json(budgets);
            } catch (err) {
                return res.status(500).json({ error: err.message });
            }

        case "POST":
            try {
                const data = req.body;
                const budget = await Budget.create(data);
                return res.status(201).json(budget);
            } catch (err) {
                return res.status(400).json({ error: err.message });
            }

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            return res.status(405).end(`Method ${req.method} not allowed`);
    }
}
