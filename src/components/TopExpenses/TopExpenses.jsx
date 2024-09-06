import ExpensesBarChart from '../ExpensesBarChart/ExpensesBarChart';
import styles from './TopExpenses.module.css';

function TopExpenses() {
    return (
        <div className={styles.Container}>
            <div className={styles.ChartContainer}>
                <ExpensesBarChart />
            </div>
        </div>
    )
}

export default TopExpenses