import CustomCard from '../CustomCard/CustomCard';
import ExpensePieChart from '../ExpensePieChart/ExpensePieChart';
import styles from './Overview.module.css';

function Overview() {
    return (
        <div className={styles.Container}>
            <CustomCard isIncomeCard={true} />
            <CustomCard isIncomeCard={false} />
            <ExpensePieChart />
        </div>
    )
}

export default Overview;