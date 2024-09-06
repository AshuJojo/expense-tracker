import { TiDeleteOutline } from 'react-icons/ti';
import styles from './RecentTransactions.module.css';
import { PiGiftLight, PiPizzaLight, PiSuitcaseRollingLight } from 'react-icons/pi';
import { FiEdit2 } from 'react-icons/fi';
import { useContext, useEffect, useState } from 'react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { ExpensesContext, TotalExpensesContext } from '../../context/Contexts';
import ExpenseModal from '../ExpenseModal/ExpenseModal';

function RecentTransactions() {
    const { totalExpenses, setTotalExpenses } = useContext(TotalExpensesContext);
    const { expenses, setExpenses } = useContext(ExpensesContext);

    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);

    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [updateItemId, setUpdateItemId] = useState(0);

    const handlePagePrev = () => {
        if (page !== 1) {
            setPage(page - 1);
        }
    }

    const handlePageNext = () => {
        if ((page) * 3 + 1 <= expenses.length) {
            setPage(page + 1);
        }
    }

    const formatDateString = (date) => {
        return (new Date(date)).toLocaleDateString("en-US",
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        )
    }

    const handleDelete = (id) => {
        const idx = expenses.findIndex(expense => expense.id === id);

        console.log(`id: ${id} idx: ${idx}`);

        const updatedTotalExpenses = totalExpenses - expenses[idx].price;
        setTotalExpenses(updatedTotalExpenses);
        localStorage.setItem('totalExpenses', updatedTotalExpenses);

        const newExpenses = [...expenses];
        newExpenses.splice(idx, 1);

        setExpenses(newExpenses);
        localStorage.setItem('expenses', JSON.stringify(newExpenses));

        if (newExpenses.length < 3 * page - 2 && page !== 1) {
            setPage(page - 1)
        }

    }

    const handleUpdate = (id) => {
        console.log(`id: ${id}`)
        if (!id)
            return;

        setUpdateItemId(() => id);
        setShowExpenseModal(true)
    }

    const handleClose = () => {
        setUpdateItemId(0);
        setShowExpenseModal(false);
    }

    useEffect(() => {
        const end = 3 * page;
        const start = end - 3;

        console.log(expenses);
        console.log(page);

        const tempData = expenses.slice(start, end);
        setFilteredData(tempData);

    }, [page, expenses]);



    return (
        <div className={styles.Container}>
            {filteredData.length > 0 ?
                (<>
                    <div className={styles.TransactionsList}>
                        {filteredData.map((item) => {
                            return <div className={styles.TransactionItemContainer} key={item.id}>
                                <div className={styles.Transaction}>
                                    <div className={styles.Info}>
                                        <div className={styles.Detail}>
                                            <div className={styles.IconContainer}>
                                                {item.category === 'food' && <PiPizzaLight className={styles.Icon} />}
                                                {item.category === 'entertainment' && <PiGiftLight className={styles.Icon} />}
                                                {item.category === 'travel' && <PiSuitcaseRollingLight className={styles.Icon} />}
                                            </div>
                                            <div className={styles.Description}>
                                                <p>{item.title}</p>
                                                <p className={styles.TransactionDate}>{formatDateString(item.date)}</p>
                                            </div>
                                        </div>
                                        <div className={styles.Price}>
                                            ₹{item.price}
                                        </div>
                                    </div>
                                    <div className={styles.TransactionAction}>
                                        <button
                                            className={`${styles.IconBtn} ${styles.DeleteBtn}`}
                                            type='button'
                                            onClick={() => { handleDelete(item.id) }}
                                        >
                                            <TiDeleteOutline />
                                        </button>
                                        <button
                                            className={`${styles.IconBtn} ${styles.EditBtn}`}
                                            type='button'
                                            onClick={() => { handleUpdate(item.id) }}
                                        >
                                            <FiEdit2 />
                                        </button>
                                    </div>
                                </div>
                                <hr className={styles.Divider} />
                            </div>
                        })}
                    </div>
                    <div className={styles.Pagination}>
                        <button type='button' className={styles.PaginationBtn} onClick={handlePagePrev}><GoArrowLeft /></button>
                        <div className={styles.PageNumber}>
                            {page}
                        </div>
                        <button type='button' className={styles.PaginationBtn} onClick={handlePageNext}><GoArrowRight /></button>
                    </div>
                </>
                ) :

                <div className={styles.PlaceholderText}>Your Recent Transactions Will Show Here.</div>
            }

            <ExpenseModal isOpen={showExpenseModal} closeModal={handleClose} id={updateItemId} />
        </div >
    )
}

export default RecentTransactions;