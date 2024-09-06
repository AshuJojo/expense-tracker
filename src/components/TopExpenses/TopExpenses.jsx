import ExpensesBarChart from '../ExpensesBarChart/ExpensesBarChart';
import styles from './TopExpenses.module.css';

function TopExpenses() {
    return (
        <div className={styles.Container}>
            <ExpensesBarChart />
        </div>
    )
}

export default TopExpenses