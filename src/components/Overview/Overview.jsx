import { useContext } from 'react';
import CustomCard from '../CustomCard/CustomCard';
import ExpensePieChart from '../ExpensePieChart/ExpensePieChart';
import styles from './Overview.module.css';
import { ExpensesContext } from '../../context/Contexts';

function Overview() {
    const {expenses} = useContext(ExpensesContext);
    
    return (
        <div className={styles.Container}>
            <CustomCard isIncomeCard={true} />
            <CustomCard isIncomeCard={false} />
            {expenses.length > 0 && <ExpensePieChart />}
        </div>
    )
}

export default Overview;