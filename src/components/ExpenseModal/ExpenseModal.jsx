import ReactModal from 'react-modal';
import styles from './ExpenseModal.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { ExpensesContext, IncomeContext, TotalExpensesContext } from '../../context/Contexts';
import { useSnackbar } from 'notistack';

function ExpenseModal({ isOpen, closeModal, id }) {
    const selectRef = useRef(null);

    const [formInput, setFormInput] = useState({
        title: '',
        price: '',
        category: '',
        date: ''
    });

    const [error, setError] = useState({
        titleError: '',
        priceError: '',
        categoryError: '',
        dateError: ''
    })

    const { income } = useContext(IncomeContext);
    const { totalExpenses, setTotalExpenses } = useContext(TotalExpensesContext);
    const { expenses, setExpenses } = useContext(ExpensesContext);

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault();


        if (!formInput.title) {
            setError({ ...error, titleError: 'This field is required' });
            return;
        } else if (!formInput.price) {
            setError({ ...error, priceError: 'This field is required' });
            return;
        } else if (!formInput.category) {
            setError({ ...error, categoryError: 'This field is required' });
            return;
        } else if (!formInput.date) {
            setError({ ...error, dateError: 'This field is required' });
            return;
        } else if (formInput.price > (income - totalExpenses)) {
            setError({ ...error, priceError: 'Expense cannot exceed wallet balance.' });
            return;
        }

        const updatedExpenses = [...expenses];
        let updatedTotalExpenses = parseInt(totalExpenses);

        if (!formInput.id) {
            updatedExpenses.push({ ...formInput, id: Date.now() });
            updatedTotalExpenses += parseInt(formInput.price);
        } else {
            const idx = expenses.findIndex((expense) => expense.id === formInput.id);

            updatedTotalExpenses += parseInt(formInput.price) - parseInt(expenses[idx].price)

            updatedExpenses[idx] = { ...formInput };
        }

        setExpenses(updatedExpenses);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));


        setTotalExpenses(updatedTotalExpenses);
        localStorage.setItem('totalExpenses', updatedTotalExpenses);

        setFormInput({
            id: '',
            title: '',
            price: '',
            category: '',
            date: ''
        });

        setError({
            titleError: '',
            priceError: '',
            categoryError: '',
            dateError: ''
        });


        enqueueSnackbar(`Expenses ${id ? 'updated' : 'added'} successfully`, { variant: 'success' });

        closeModal();
    }

    const handleInputChange = (e) => {
        let { id, value } = e.target;

        const newFormInput = { ...formInput };

        newFormInput[id] = value;

        setFormInput(newFormInput);
    }

    useEffect(() => {
        console.log('expenses', expenses)
        if (!id)
            return;

        const expenseDetails = expenses.find((expense) => expense.id === id)

        if (!expenseDetails)
            return;

        setFormInput(expenseDetails);
    }, [id])

    useEffect(() => {
        if (!selectRef.current)
            return;

        console.log(selectRef.current);
        if (selectRef.current?.selectedIndex === 0) {
            selectRef.current.classList.add(styles.PlaceholderText);
        } else {
            selectRef.current.classList.remove(styles.PlaceholderText);
        }
    }, [selectRef?.current]);

    return (
        <ReactModal
            className={styles.Modal}
            isOpen={isOpen}
            appElement={document.getElementById('root')}
        >
            <div className={styles.Container}>
                <h1 className={styles.Title}>Add Expenses</h1>
                <form className={styles.Form} onSubmit={handleSubmit}>
                    <div className={styles.Row}>
                        <div className={styles.InputContainer}>
                            <input
                                id="title"
                                className={styles.Input}
                                type='text'
                                placeholder='Title'
                                value={formInput.title}
                                onChange={handleInputChange}
                            />
                            {error.titleError && <div className={styles.InputErrorMsg}>{error.titleError}</div>}
                        </div>
                        <div className={styles.InputContainer}>
                            <input
                                id="price"
                                className={styles.Input}
                                type='number'
                                placeholder='Price'
                                value={formInput.price}
                                onChange={handleInputChange}
                            />
                            {error.priceError && <div className={styles.InputErrorMsg}>{error.priceError}</div>}
                        </div>
                    </div>
                    <div className={styles.Row}>
                        <div className={styles.InputContainer}>
                            <select
                                ref={selectRef}
                                className={`${styles.Input} ${styles.PlaceholderText}`}
                                id="category"
                                onChange={handleInputChange}
                            >
                                <option value="" className={styles.PlaceholderText} selected={!formInput.category}>Select Category</option>
                                <option value="food" className={styles.OptionText} selected={formInput.category === 'food'}>Food</option>
                                <option value="entertainment" className={styles.OptionText} selected={formInput.category === 'entertainment'}>Entertainment</option>
                                <option value="travel" className={styles.OptionText} selected={formInput.category === 'travel'}>Travel</option>
                            </select>
                            {error.categoryError && <div className={styles.InputErrorMsg}>{error.categoryError}</div>}
                        </div>
                        <div className={styles.InputContainer}>
                            <input
                                id="date"
                                className={styles.Input}
                                type='date'
                                value={formInput.date}
                                onChange={handleInputChange}
                            />
                            {error.dateError && <div className={styles.InputErrorMsg}>{error.dateError}</div>}
                        </div>
                    </div>
                    <div className={styles.FormBtnGrp}>
                        <button
                            type='submit'
                            className={`${styles.Btn} ${styles.AddExpenseBtn}`}
                            onClick={handleSubmit}
                        >
                            Add Expense
                        </button>

                        <button
                            type='button'
                            className={`${styles.Btn} ${styles.CancelBtn}`}
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </ReactModal>
    )
}

export default ExpenseModal