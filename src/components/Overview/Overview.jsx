import CustomCard from '../CustomCard/CustomCard';
import styles from './Overview.module.css';

function Overview() {
    return (
        <div className={styles.Container}>
            <CustomCard isIncomeCard={true} />
            <CustomCard isIncomeCard={false} />
        </div>
    )
}

export default Overview;