import { TiDeleteOutline } from 'react-icons/ti';
import styles from './RecentTransactions.module.css';
import { PiGiftLight, PiPizzaLight, PiSuitcaseRollingLight } from 'react-icons/pi';
import { FiEdit2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

function RecentTransactions() {
    const data = [
        {
            id: 1,
            title: 'Samosa',
            price: 150,
            category: 'food',
            transactionDate: 'March 20, 2024'
        },
        {
            id: 2,
            title: 'Movie',
            price: 300,
            category: 'entertainment',
            transactionDate: 'March 21, 2024'
        },
        {
            id: 3,
            title: 'Auto',
            price: 50,
            category: 'travel',
            transactionDate: 'March 22, 2024'
        },
        {
            id: 4,
            title: 'Auto',
            price: 510,
            category: 'travel',
            transactionDate: 'March 22, 2024'
        },
    ]

    const [page, setPage] = useState(1);
    const [filteredData, setFilteredData] = useState([]);

    const handlePagePrev = () => {
        if (page !== 1) {
            setPage(page - 1);
        }
    }

    const handlePageNext = () => {
        if ((page) * 3 + 1 <= data.length) {
            setPage(page + 1);
        }
    }

    useEffect(() => {
        const end = 3 * page;
        const start = end - 3;

        const tempData = data.slice(start, end);
        setFilteredData(tempData);
    }, [page]);


    return (
        <div className={styles.Container}>
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
                    <hr className={styles.Divider} />
                </div>
            })}

            <div className={styles.Pagination}>
                <button type='button' className={styles.PaginationBtn} onClick={handlePagePrev}><GoArrowLeft /></button>
                <div className={styles.PageNumber}>
                    {page}
                </div>
                <button type='button' className={styles.PaginationBtn} onClick={handlePageNext}><GoArrowRight /></button>
            </div>
        </div >
    )
}

export default RecentTransactions;