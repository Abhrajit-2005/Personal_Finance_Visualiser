import { Button } from "@/components/ui/button";

export default function TransactionList({ transactions, onDelete, onEdit }) {
    return (
        <ul className="space-y-2">
            {transactions.map((tx) => (
                <li key={tx._id} className="p-2 border rounded flex justify-between items-center">
                    <div>
                        <div className="font-semibold">${tx.amount}</div>
                        <div className="text-sm">{new Date(tx.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">{tx.description}</div>
                    </div>
                    <div className="space-x-2">
                        <Button onClick={() => onEdit(tx)}>Edit</Button>
                        <Button variant="destructive" onClick={() => onDelete(tx._id)}>Delete</Button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
