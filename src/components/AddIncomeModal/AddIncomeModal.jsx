import ReactModal from 'react-modal';
import styles from './AddIncomeModal.module.css';
import { useContext, useEffect, useState } from 'react';
import { IncomeContext } from '../../context/Contexts';
import { useSnackbar } from 'notistack';

function AddIncomeModal({ isOpen, closeModal }) {
    const [value, setValue] = useState('');
    const { income, setIncome } = useContext(IncomeContext);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value >= 0) {
            setIncome(value);
            localStorage.setItem('income', value);
            closeModal();

            enqueueSnackbar('Successfully added your income.', { variant: 'success' });
        }
    }

    useEffect(() => {
        if (income)
            setValue(income);
    }, []);

    return (
        <ReactModal
            className={styles.Modal}
            isOpen={isOpen}
            appElement={document.getElementById('root')}
            onAfterClose={() => { setValue(income) }}
        >
            <div className={styles.Container}>
                <h1 className={styles.Title}>Add Balance</h1>
                <form className={styles.Form} onSubmit={handleSubmit}>
                    <div className={styles.InputContainer}>
                        <input
                            className={styles.Input}
                            type='number'
                            placeholder='Income Amount'
                            value={value}
                            onChange={(e) => { setValue(e.target.value) }}
                        />
                        {value < 0 && <div className={styles.InputErrorMsg}>Income should be greater or equals to 0.</div>}
                    </div>

                    <button
                        type='submit'
                        className={`${styles.Btn} ${styles.AddBalanceBtn}`}
                        onClick={handleSubmit}
                    >
                        Add Balance
                    </button>

                    <button
                        type='button'
                        className={`${styles.Btn} ${styles.CancelBtn}`}
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </ReactModal>
    )
}

export default AddIncomeModal