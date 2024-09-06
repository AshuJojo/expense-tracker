import Overview from '../Overview/Overview';
import styles from './ExpenseTracker.module.css';
import RecentTransactions from '../RecentTransactions/RecentTransactions'
import TopExpenses from '../TopExpenses/TopExpenses';
import { useContext } from 'react';
import { ExpensesContext } from '../../context/Contexts';

function ExpenseTracker() {
    const { expenses } = useContext(ExpensesContext);

    return (
        <div className={styles.Container}>
            <div className={styles.ExpenseTracker}>
                <h1 className={styles.Title}>Expense Tracker</h1>
                <Overview />
            </div>
            {expenses.length > 0 && <div className={styles.Row}>
                <div className={styles.RecentTransactions}>
                    <h1 className={styles.Subheading}>Recent Transactions</h1>
                    <RecentTransactions />
                </div>
                <div className={styles.TopExpenses}>
                    <h1 className={styles.Subheading}>Top Expenses</h1>
                    <TopExpenses />
                </div>
            </div>}
        </div>
    )
}

export default ExpenseTracker;