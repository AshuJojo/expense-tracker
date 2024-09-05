import { useContext } from 'react';
import styles from './CustomCard.module.css';
import { IncomeContext, TotalExpensesContext } from '../../context/Contexts';

function CustomCard({ isIncomeCard }) {
    const { income, setIncome } = useContext(IncomeContext);
    const { totalExpenses, setTotalExpenses } = useContext(TotalExpensesContext);

    const handleAddIncome = () => {
        console.log('Add Income button clicked');
    }

    const handleAddExpense = () => {
        console.log('Add Expense button clicked');
    }

    return (
        <div className={styles.Card}>
            <h1 className={styles.CardTitle}>
                {isIncomeCard ? 'Wallet Balance: ' : 'Expenses: '}
                <span className={isIncomeCard ? styles.Income : styles.Expense}>
                    ₹{isIncomeCard ? income : totalExpenses}
                </span>
            </h1>

            <button className={`${styles.Btn} ${isIncomeCard ? styles.IncomeBtn : styles.ExpenseBtn}`} type="button"
                onClick={isIncomeCard ? handleAddIncome : handleAddExpense}>
                {isIncomeCard ? '+ Add Income' : '+ Add Expense'}
            </button>
        </div>
    )
}

export default CustomCard;