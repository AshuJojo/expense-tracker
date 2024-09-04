import styles from './CustomCard.module.css';

function CustomCard({ isIncomeCard, income, expense, handleAddIncome, handleAddExpense }) {
    return (
        <div className={styles.Card}>
            <h1 className={styles.CardTitle}>
                {isIncomeCard ? 'Wallet Balance: ' : 'Expenses: '}
                <span className={isIncomeCard ? styles.Income : styles.Expense}>
                    ₹{isIncomeCard ? income : expense}
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