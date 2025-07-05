"use client";
import { useState } from "react";
import useSWR from "swr";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import dynamic from "next/dynamic";
import pic from "../../public/pic.png"
import BudgetList from "@/components/BudgetList";
import BudgetForm from "@/components/BudgetForm";
import BudgetVsActualChart from "@/components/BudgetVsActualChart";
import SpendingInsights from "@/components/SpendingInsights";

const MonthlyExpensesChart = dynamic(() => import("@/components/MonthlyExpensesChart"), { ssr: false });
const CategoryPieChart = dynamic(() => import("@/components/CategoryPieChart"), { ssr: false });

import SummaryCards from "@/components/SummaryCards";


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data: transactions, mutate } = useSWR("/api/transactions", fetcher);
  const { data: budgets, mutate: mutateBudgets } = useSWR("/api/budgets", fetcher);

  const [editing, setEditing] = useState(null);
  const [editingBudget, setEditingBudget] = useState(null);

  const handleAddOrEditBudget = async (data) => {
    if (editingBudget) {
      await fetch(`/api/budgets/${editingBudget._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setEditingBudget(null);
    } else {
      await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    mutateBudgets();
  };


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
        <h1 className="text-6xl font-bold text-center">Personal Finance Visualizer</h1>

        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <TransactionForm onSubmit={handleAddOrEdit} initialData={editing} />
          </div>
          <div className="flex-1">
            {transactions && <SummaryCards transactions={transactions} />}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <MonthlyExpensesChart data={monthlyData} />
          </div>
          <div className="flex-1">
            <CategoryPieChart transactions={transactions} />
          </div>
        </div>

        <section className="space-y-4 mt-8">
          <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-teal-400">
            Monthly Budgets
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1/2">
              <BudgetForm onSubmit={handleAddOrEditBudget} initialData={editingBudget} />
            </div>
            <div className="flex-1/2">
              <BudgetList
                budgets={budgets}
                onEdit={(b) => setEditingBudget(b)}
                onDelete={async (id) => {
                  await fetch(`/api/budgets/${id}`, { method: "DELETE" });
                  mutateBudgets();
                }}
              />
            </div>
          </div>
        </section>

        <BudgetVsActualChart
          budgets={budgets}
          transactions={transactions}
          selectedMonth={"2025-07"}
        />

        <SpendingInsights
          budgets={budgets}
          transactions={transactions}
          selectedMonth={"2025-07"}
        />

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
