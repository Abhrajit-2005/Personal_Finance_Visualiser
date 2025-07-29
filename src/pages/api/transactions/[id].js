import dbConnect from "@/lib/dbConnect";
import Transaction from "@/lib/models/Transaction";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
    await dbConnect();

    const { id } = req.query;
    const { userId } = getAuth(req);
    const uId = userId;

    if (!uId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "PUT") {
        try {
            const { amount, date, description, category } = req.body;
            const updated = await Transaction.findOneAndUpdate(
                { userId: uId, _id: id },
                { amount, date, description, category },
                { new: true }
            );
            if (!updated) {
                return res.status(404).json({ error: "Transaction not found or unauthorized" });
            }
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    if (req.method === "DELETE") {
        try {
            const deleted = await Transaction.findOneAndDelete({ _id: id, userId });
            if (!deleted) {
                return res.status(404).json({ error: "Transaction not found or unauthorized" });
            }
            return res.status(204).end();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} not allowed`);
}
