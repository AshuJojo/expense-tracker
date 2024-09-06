import { useEffect, useState } from "react"
import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker"
import { IncomeContext, ExpensesContext, TotalExpensesContext } from "./context/Contexts"

function App() {
  const [income, setIncome] = useState(5000);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const persistedBalance = localStorage.getItem('income');
    const persistedTotalExpenses = localStorage.getItem('totalExpenses');
    const persistedExpenses = localStorage.getItem('expenses');

    if (persistedBalance)
      setIncome(persistedBalance);

    if (persistedTotalExpenses)
      setTotalExpenses(persistedTotalExpenses);

    if (persistedExpenses)
      setExpenses(JSON.parse(persistedExpenses));

  }, []);

  return (
    <IncomeContext.Provider value={{ income, setIncome }}>
      <TotalExpensesContext.Provider value={{ totalExpenses, setTotalExpenses }}>
        <ExpensesContext.Provider value={{ expenses, setExpenses }}>

          <ExpenseTracker />

        </ExpensesContext.Provider>
      </TotalExpensesContext.Provider>
    </IncomeContext.Provider>
  )
}

export default App