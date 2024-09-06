import ReactModal from 'react-modal';
import styles from './IncomeModal.module.css';
import { useContext, useState } from 'react';
import { IncomeContext } from '../../context/Contexts';
import { useSnackbar } from 'notistack';

function IncomeModal({ isOpen, closeModal }) {
    const [value, setValue] = useState('');
    const { income, setIncome } = useContext(IncomeContext);
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value) {
            if (value >= 0) {
                setError(null);
                setIncome(value);
                localStorage.setItem('income', value);
                closeModal();

                enqueueSnackbar('Successfully added your income.', { variant: 'success' });
            } else {
                setError('Income should not be negative.')
            }
        } else {
            setError('This field cannot be empty.');
        }
    }

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
                        {error && <div className={styles.InputErrorMsg}>{error}</div>}
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

export default IncomeModal