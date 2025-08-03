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

    const handleAddBudget = async (data) => {
        const payload = { ...data, userId };
        await fetch("/api/budgets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        mutateBudgets();
    };

    const handleUpdateBudget = async (updatedBudget) => {
        await fetch(`/api/budgets/${updatedBudget._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...updatedBudget, userId }),
        });

        mutateBudgets(); // revalidate data
    }

    const handleAdd = async (data) => {
        const payload = { ...data, userId };
        await fetch("/api/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        mutate();
    };
    const handleUpdate = async (updatedTx) => {
        await fetch(`/api/transactions/${updatedTx._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...updatedTx, userId }),
        });
        mutate(); // revalidate data
    };


    const handleDelete = async (id) => {
        await fetch(`/api/transactions/${id}`, {
            method: "DELETE",
        });
        mutate();
    };

    const handleDeleteBudget = async (id) => {
        await fetch(`/api/budgets/${id}`, {
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-400 to-teal-500 py-12 px-4 sm:px-6 lg:px-8">
            <main className="max-w-8xl mx-auto p-8 space-y-10 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 transition-all duration-500">
                {/* Header Section */}
                <div className="relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 bg-slate-950 rounded-t-3xl"></div>
                    <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

                    {/* User button positioned at top-right */}
                    <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-xl opacity-30 animate-pulse"></div>

                            <UserButton
                                afterSwitchSessionUrl="/"
                                appearance={{
                                    elements: {
                                        userButton: {
                                            width: '50px',
                                            height: '50px',
                                        },
                                        userButtonAvatarBox: {
                                            width: '52px',
                                            height: '52px',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    {/* Main header content */}
                    <div className="relative flex flex-col justify-start items-start p-6 lg:p-8 pr-20 lg:pr-24 border-b border-white/30 space-y-6">
                        {/* Welcome text and user info */}
                        <div className="w-full space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-amber-600 leading-tight">
                                    Welcome, {username}!
                                </h1>
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl sm:text-3xl animate-bounce">✨</span>
                                </div>
                            </div>

                            {/* Subtitle */}
                            <p className="text-sm sm:text-base lg:text-lg text-white font-medium max-w-2xl leading-relaxed">
                                Take control of your finances with smart budgeting and expense tracking
                            </p>

                            {/* Quick stats or current date */}
                            <div className="flex flex-wrap items-center gap-4 mt-4">
                                <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-lg rounded-full px-2 py-1 text-sm font-medium text-white">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>

                                {transactions && (
                                    <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-lg rounded-full px-3 py-1 text-sm font-medium text-white">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <span>{transactions.length} Transactions</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating elements for visual interest */}
                {/* <div className="absolute bottom-0 left-1/4 w-16 h-16 bg-teal-400/10 rounded-full blur-2xl animate-ping"></div> */}
                {/* <div className="absolute bottom-0 right-1/3 w-12 h-12 bg-indigo-400/10 rounded-full blur-xl animate-ping delay-700"></div> */}


                {/* Transactions Summary & Form */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white/20 backdrop-blur-4xl rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:bg-white">
                        <TransactionForm onSubmit={handleAdd} initialData={editing} />
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
                            <BudgetForm onSubmit={handleAddBudget} initialData={editingBudget} />
                        </div>
                        <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white">
                            <BudgetList
                                budgets={budgets}
                                onEdit={(b) => setEditingBudget(b)}
                                onDelete={handleDeleteBudget}
                                onUpdate={handleUpdateBudget}
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
                            selectedMonth={new Date().toISOString().slice(0, 7)}
                        />
                    </div>
                    <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-white">
                        <h2 className="text-2xl font-semibold text-purple-700 mb-4 animate-fade-in">Spending Insights</h2>
                        <SpendingInsights
                            budgets={budgets}
                            transactions={transactions}
                            selectedMonth={new Date().toISOString().slice(0, 7)}
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
                            onUpdate={handleUpdate}
                        />
                    ) : (
                        <div className="text-gray-500 text-center animate-pulse">Loading...</div>
                    )}
                </section>
            </main >
        </div >
    );
}