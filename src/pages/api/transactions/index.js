import dbConnect from "@/lib/dbConnect";
import Transaction from "@/lib/models/Transaction";

export default async function handler(req, res) {
    console.log("Transactions API called with method:", req.method);
    await dbConnect();

    if (req.method === "GET") {
        try {
            const { userId } = req.query;

            // Optionally validate userId
            if (!userId) {
                return res.status(400).json({ error: "Missing userId in query" });
            }

            const transactions = await Transaction.find({ userId });
            // console.log(`✅ Found ${transactions.length} transactions for user: ${userId}`);
            return res.status(200).json(transactions);
        } catch (err) {
            console.error("❌ GET error:", err.message);
            return res.status(500).json({ error: err.message });
        }
    }

    if (req.method === "POST") {
        try {
            const data = req.body;
            const transaction = await Transaction.create(data);
            // console.log("✅ Transaction created:", transaction);
            return res.status(201).json(transaction);
        } catch (err) {
            console.error("❌ POST error:", err.message);
            return res.status(400).json({ error: err.message });
        }
    }

    res.setHeader("Allow", ["GET", "POST"]);
    console.log("❌ Method not allowed:", req.method);
    res.status(405).end(`Method ${req.method} not allowed`);
}
