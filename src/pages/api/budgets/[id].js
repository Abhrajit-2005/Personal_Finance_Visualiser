import dbConnect from "@/lib/dbConnect";
import Budget from "@/lib/models/Budget";

export default async function handler(req, res) {
    await dbConnect();
    const { id } = req.query;

    if (req.method === "PUT") {
        try {
            const { name, amount, startDate, endDate } = req.body;
            const updated = await Budget.findByIdAndUpdate(
                id,
                { name, amount, startDate, endDate },
                { new: true, runValidators: true }
            );
            if (!updated) return res.status(404).json({ error: "Budget not found" });
            return res.status(200).json(updated);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    if (req.method === "DELETE") {
        try {
            const deleted = await Budget.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ error: "Budget not found" });
            return res.status(200).json({ message: "Deleted successfully" });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    res.setHeader("Allow", ["PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} not allowed`);
}