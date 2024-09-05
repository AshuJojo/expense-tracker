import { createContext } from "react";

const IncomeContext = createContext(5000);
const TotalExpensesContext = createContext(0);
const ExpensesContext = createContext([]);

export {IncomeContext, TotalExpensesContext, ExpensesContext};