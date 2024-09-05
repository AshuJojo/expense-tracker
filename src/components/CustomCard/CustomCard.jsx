import { useContext, useState } from 'react';
import styles from './CustomCard.module.css';
import { IncomeContext, TotalExpensesContext } from '../../context/Contexts';
import AddIncomeModal from '../AddIncomeModal/AddIncomeModal';

function CustomCard({ isIncomeCard }) {
    const { income, setIncome } = useContext(IncomeContext);
    const { totalExpenses, setTotalExpenses } = useContext(TotalExpensesContext);

    const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

    return (
        <div className={styles.Card}>
            <h1 className={styles.CardTitle}>
                {isIncomeCard ? 'Wallet Balance: ' : 'Expenses: '}
                <span className={isIncomeCard ? styles.Income : styles.Expense}>
                    ₹{isIncomeCard ? income : totalExpenses}
                </span>
            </h1>

            <button className={`${styles.Btn} ${isIncomeCard ? styles.IncomeBtn : styles.ExpenseBtn}`} type="button"
                onClick={isIncomeCard ? () => { setShowAddIncomeModal(true) } : () => { setShowAddExpenseModal(true) }}>
                {isIncomeCard ? '+ Add Income' : '+ Add Expense'}
            </button>

            {isIncomeCard ?
                <AddIncomeModal isOpen={showAddIncomeModal} closeModal={() => {setShowAddIncomeModal(false)}}/> :
                <></>
            }
        </div>
    )
}

export default CustomCard;