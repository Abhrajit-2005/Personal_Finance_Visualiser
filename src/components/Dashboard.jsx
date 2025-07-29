"use client";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import useSWR from "swr";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import dynamic from "next/dynamic";
import BudgetList from "./BudgetList";
import BudgetForm from "./BudgetForm";
import BudgetVsActualChart from "./BudgetVsActualChart";
import SpendingInsights from "./SpendingInsights";
import SummaryCards from "./SummaryCards";
import { UserButton } from "@clerk/nextjs";

const MonthlyExpensesChart = dynamic(() => import("./MonthlyExpensesChart"), { ssr: false });
const CategoryPieChart = dynamic(() => import("./CategoryPieChart"), { ssr: false });

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
    const { user, isLoaded } = useUser();
    const username = user?.firstName;
    const userId = user?.id;

    if (!isLoaded) return (
        <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-100">
            Loading user...
        </div>
    );

    const { data: transactions, mutate } = useSWR(
        userId ? `/api/transactions?userId=${userId}` : null,
        fetcher
    );

    const { data: budgets, mutate: mutateBudgets } = useSWR(
        userId ? `/api/budgets?userId=${userId}` : null,
        fetcher
    );

    const [editing, setEditing] = useState(null);
    const [editingBudget, setEditingBudget] = useState(null);

    const handleAddOrEditBudget = async (data) => {
        const payload = { ...data, userId };
        if (editingBudget) {
            await fetch(`/api/budgets/${editingBudget._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            setEditingBudget(null);
        } else {
            await fetch("/api/budgets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        }
        mutateBudgets();
    };

    const handleAddOrEdit = async (data) => {
        const payload = { ...data, userId };
        if (editing) {
            await fetch(`/api/transactions/${editing._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            setEditing(null);
        } else {
            await fetch("/api/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
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

    const handleDeleteBudget = async (id) => {
        await fetch(`/api/budgets?id=${id}`, {
            method: "DELETE",
        });
        mutateBudgets();
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-200 to-teal-300 py-12 px-4 sm:px-6 lg:px-8">
            <main className="max-w-8xl mx-auto p-8 space-y-12 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 transition-all duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/30">
                    <h1 className="p-4 text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">
                        Welcome, {username} ✨
                    </h1>
                    <div className="mt-4 md:mt-0">
                        <UserButton afterSwitchSessionUrl="/" appearance={{
                            elements: {
                                userButton: {
                                    width: '64px', // Default is ~32px, increase as needed
                                    height: '64px',
                                },
                            },
                        }} />
                    </div>
                </div>

                {/* Transactions Summary & Form */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/20 backdrop-blur-4xl rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:bg-white">
                        <TransactionForm onSubmit={handleAddOrEdit} initialData={editing} />
                    </div>
                    <div className="bg-white/20 backdrop-blur-2xl rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white">
                        {transactions && <SummaryCards transactions={transactions} />}
                    </div>
                </section>

                {/* Charts Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 animate-fade-in">Monthly Expenses</h2>
                        <MonthlyExpensesChart data={monthlyData} />
                    </div>
                    <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white">
                        <h2 className="text-2xl font-semibold text-purple-700 mb-4 animate-fade-in">Category Breakdown</h2>
                        <CategoryPieChart transactions={transactions} />
                    </div>
                </section>

                {/* Budgets Section */}
                <section className="space-y-6">
                    <h2 className="text-5xl py-4 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-teal-700">
                        Monthly Budgets
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white">
                            <BudgetForm onSubmit={handleAddOrEditBudget} initialData={editingBudget} />
                        </div>
                        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white">
                            <BudgetList
                                budgets={budgets}
                                onEdit={(b) => setEditingBudget(b)}
                                onDelete={handleDeleteBudget}
                            />
                        </div>
                    </div>
                </section>

                {/* Budget vs Actual & Insights */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white">
                        <h2 className="text-2xl font-semibold text-indigo-700 mb-4 animate-fade-in">Budget vs Actual</h2>
                        <BudgetVsActualChart
                            budgets={budgets}
                            transactions={transactions}
                            selectedMonth={"2025-07"}
                        />
                    </div>
                    <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white">
                        <h2 className="text-2xl font-semibold text-purple-700 mb-4 animate-fade-in">Spending Insights</h2>
                        <SpendingInsights
                            budgets={budgets}
                            transactions={transactions}
                            selectedMonth={"2025-07"}
                        />
                    </div>
                </section>

                {/* Transactions List */}
                <section className="py-4 bg-white/20 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-102 hover:bg-white">
                    {transactions ? (
                        <TransactionList
                            transactions={transactions}
                            onDelete={handleDelete}
                            onEdit={(tx) => setEditing(tx)}
                        />
                    ) : (
                        <div className="text-gray-500 text-center animate-pulse">Loading...</div>
                    )}
                </section>
            </main>
        </div>
    );
}