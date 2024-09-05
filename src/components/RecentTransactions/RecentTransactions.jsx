import { TiDeleteOutline } from 'react-icons/ti';
import styles from './RecentTransactions.module.css';
import { PiGiftLight, PiPizzaLight, PiSuitcaseRollingLight } from 'react-icons/pi';
import { FiEdit2 } from 'react-icons/fi';

function RecentTransactions() {
    const data = [
        {
            title: 'Samosa',
            price: 150,
            category: 'food',
            transactionDate: 'March 20, 2024'
        },
        {
            title: 'Movie',
            price: 300,
            category: 'entertainment',
            transactionDate: 'March 21, 2024'
        },
        {
            title: 'Auto',
            price: 50,
            category: 'travel',
            transactionDate: 'March 22, 2024'
        },
    ]

    return (
        <div className={styles.Container}>
            {data.map((item) => {
                return <>
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
                                    <p className={styles.TransactionDate}>{item.transactionDate}</p>
                                </div>
                            </div>
                            <div className={styles.Price}>
                                ₹{item.price}
                            </div>
                        </div>
                        <div className={styles.TransactionAction}>
                            <button type='button' className={`${styles.IconBtn} ${styles.DeleteBtn}`}><TiDeleteOutline /></button>
                            <button type='button' className={`${styles.IconBtn} ${styles.EditBtn}`}><FiEdit2 /></button>
                        </div>
                    </div>
                    <hr /></>
            })}
        </div>
    )
}

export default RecentTransactions;