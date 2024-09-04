import ExpenseTracker from '../ExpenseTracker/ExpenseTracker';
import styles from './Home.module.css';

function Home() {
    return (
        <div className={styles.Container}>
            <h1 className={styles.Title}>Expense Tracker</h1>
            <ExpenseTracker />
        </div>
    )
}

export default Home;