🧮 Personal Finance Visualizer

A modern personal finance dashboard built with Next.js, MongoDB, and Tailwind CSS, helping you track your transactions, visualize expenses, and manage budgets with interactive charts.

🚀 Features
✅ Add, edit, and delete personal transactions
✅ Categorize transactions (Food, Rent, Entertainment, etc.)
✅ Interactive charts with Recharts (monthly expenses, category breakdown)
✅ Budget tracking with budgets CRUD
✅ Clean and modern UI with Tailwind
✅ Responsive and mobile-friendly
✅ Serverless API routes for data persistence

📦 Tech Stack
1. Next.js (App Router)
2. MongoDB (via Mongoose)
3. Tailwind CSS
4. Recharts (for visualizations)
5. SWR (for client-side data fetching)

🛠️ Setup Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/Abhrajit-2005/Personal_Finance_Visualiser.git
    cd personal-finance-visualizer

2. Install dependencies:
   ```bash
    npm install

3. Configure environment variables - Create a .env.local file at the root and add:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/your-db-name?retryWrites=true&w=majority

4. Run the development server:
   ```bash
    npm run dev

Then open http://localhost:3000 in your browser.