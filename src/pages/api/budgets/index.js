import dbConnect from "@/lib/dbConnect";
import Budget from "@/lib/models/Budget";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "GET") {
        try {
            const { userId } = req.query;

            // Optionally validate userId
            if (!userId) {
                return res.status(400).json({ error: "Missing userId in query" });
            }

            const budgets = await Budget.find({ userId });
            console.log(`✅ Found ${budgets.length} budgets for user: ${userId}`);
            return res.status(200).json(budgets);
        } catch (err) {
            console.error("❌ GET error:", err.message);
            return res.status(500).json({ error: err.message });
        }
    }
    if (req.method === "POST") {
        try {
            const data = req.body;
            const budget = await Budget.create(data);
            console.log("✅ Budget created:", budget);
            return res.status(201).json(budget);
        } catch (err) {
            console.error("❌ POST error:", err.message);
            return res.status(400).json({ error: err.message });
        }
    }
}
