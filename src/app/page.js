"use client";
import { useState } from "react";
import useSWR from "swr";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyExpensesChart from "@/components/MonthlyExpensesChart";
import CategoryPieChart from "@/components/CategoryPieChart";
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
    <main className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Personal Finance Visualizer</h1>
      <TransactionForm
        onSubmit={handleAddOrEdit}
        initialData={editing}
      />
      <MonthlyExpensesChart data={monthlyData} />
      {transactions && <SummaryCards transactions={transactions} />}

      <CategoryPieChart transactions={transactions} />
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
  );
}
