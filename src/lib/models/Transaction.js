import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    amount: Number,
    description: String,
    date: Date,
    category: {
        type: String,
        enum: ["Food", "Rent", "Entertainment", "Utilities", "Other"],
        default: "Other"
    }
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
