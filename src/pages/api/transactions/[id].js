import dbConnect from "@/lib/dbConnect";
import Transaction from "@/lib/models/Transaction";

export default async function handler(req, res) {
    await dbConnect();
    const { id } = req.query;

    if (req.method === "PUT") {
        try {
            const { amount, date, description } = req.body;
            const updated = await Transaction.findByIdAndUpdate(
                id,
                { amount, date, description },
                { new: true }
            );
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    if (req.method === "DELETE") {
        try {
            await Transaction.findByIdAndDelete(id);
            return res.status(204).end();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} not allowed`);
}
