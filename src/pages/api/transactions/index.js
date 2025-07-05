import dbConnect from "@/lib/dbConnect";
import Transaction from "@/lib/models/Transaction";

export default async function handler(req, res) {
    console.log("Transactions API called with method:", req.method);

    await dbConnect()
        .then(() => console.log("✅ MongoDB connected successfully"))
        .catch((err) => {
            console.error("❌ MongoDB connection failed:", err.message);
            return res.status(500).json({ error: "Database connection failed" });
        });

    if (req.method === "GET") {
        try {
            const transactions = await Transaction.find();
            console.log(`✅ Found ${transactions.length} transactions`);
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
            console.log("✅ Transaction created:", transaction);
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
