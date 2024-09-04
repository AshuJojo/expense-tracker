import CustomCard from '../CustomCard/CustomCard';
import styles from './ExpenseTracker.module.css';

function ExpenseTracker() {
    return (
        <div className={styles.Container}>
            <CustomCard isIncomeCard={true} income={4500} handleAddIncome={() => { console.log('Add Income') }} />
            <CustomCard isIncomeCard={false} expense={500} handleAddExpense={() => { console.log('Add Expense') }} />
        </div>
    )
}

export default ExpenseTracker