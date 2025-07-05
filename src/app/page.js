"use client";
import { useState } from "react";
import useSWR from "swr";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import dynamic from "next/dynamic";
import pic from "../../public/pic.png"

const MonthlyExpensesChart = dynamic(() => import("@/components/MonthlyExpensesChart"), { ssr: false });
const CategoryPieChart = dynamic(() => import("@/components/CategoryPieChart"), { ssr: false });

import SummaryCards from "@/components/SummaryCards";


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: transactions, mutate } = useSWR("/api/transactions", fetcher);

  const [editing, setEditing] = useState(null);

  const handleAddOrEdit = async (data) => {
    if (editing) {
      await fetch(`/api/transactions/${editing._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setEditing(null);
    } else {
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    mutate();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });
    mutate();
  };

  const monthlyData = transactions
    ? transactions.reduce((acc, tx) => {
      const month = new Date(tx.date).toLocaleString("default", { month: "short" });
      const found = acc.find((m) => m.month === month);
      if (found) {
        found.total += tx.amount;
      } else {
        acc.push({ month, total: tx.amount });
      }
      return acc;
    }, [])
    : [];

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${pic.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <main className="max-w-8xl mx-auto p-4 space-y-6 bg-white/80 backdrop-blur rounded-xl shadow-lg">
        <h1 className="text-5xl font-bold text-center">Personal Finance Visualizer</h1>

        {/* Row 1: TransactionForm + SummaryCards */}
        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <TransactionForm onSubmit={handleAddOrEdit} initialData={editing} />
          </div>
          <div className="flex-1">
            {transactions && <SummaryCards transactions={transactions} />}
          </div>
        </div>

        {/* Row 2: MonthlyExpensesChart + CategoryPieChart */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <MonthlyExpensesChart data={monthlyData} />
          </div>
          <div className="flex-1">
            <CategoryPieChart transactions={transactions} />
          </div>
        </div>

        {/* Transaction list at the bottom */}
        {transactions ? (
          <TransactionList
            transactions={transactions}
            onDelete={handleDelete}
            onEdit={(tx) => setEditing(tx)}
          />
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </div>
  );

}
