"use client";

export default function SpendingInsights({ budgets, transactions, selectedMonth }) {
    if (!budgets || budgets.length === 0 || !transactions) {
        return (
            <div className="rounded-2xl shadow-xl p-4 backdrop-blur bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
                No insights available.
            </div>
        );
    }
    console.log("Hello Budgets:", budgets);
    console.log("Selected Month:", selectedMonth);

    console.log("Filtered Budgets:", budgets.filter((b) => b.month === selectedMonth));

    const insights = budgets
        .filter((b) => b.month === selectedMonth)
        .map((b) => {
            const actual = transactions
                .filter((tx) => tx.category === b.category && tx.date.slice(0, 7) === b.month)
                .reduce((sum, tx) => sum + tx.amount, 0);

            if (actual > b.amount) {
                return {
                    category: b.category,
                    status: "overspent",
                    difference: actual - b.amount,
                };
            } else {
                return {
                    category: b.category,
                    status: "underspent",
                    difference: b.amount - actual,
                };
            }
        });

    return (
        <div className="rounded-2xl shadow-2xl p-6 backdrop-blur bg-white/50 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700 space-y-4">
            {insights.map((item, idx) => (
                <div
                    key={idx}
                    className={`p-4 rounded-xl ${item.status === "overspent"
                        ? "bg-red-100/30 dark:bg-red-800/30 border border-red-300 dark:border-red-600"
                        : "bg-green-100/30 dark:bg-green-800/30 border border-green-300 dark:border-green-600"
                        }`}
                >
                    <p className="text-gray-800 dark:text-gray-100">
                        {item.status === "overspent" ? (
                            <>
                                ⚠️ You overspent in{" "}
                                <span className="font-semibold">{item.category}</span> by ₹
                                {item.difference.toFixed(2)}
                            </>
                        ) : (
                            <>
                                ✅ You saved ₹{item.difference.toFixed(2)} in{" "}
                                <span className="font-semibold">{item.category}</span> this month.
                            </>
                        )}
                    </p>
                </div>
            ))}
        </div>
    );
}
