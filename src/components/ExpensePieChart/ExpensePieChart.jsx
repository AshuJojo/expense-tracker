import { PieChart, Pie, Cell } from 'recharts';
import styles from './ExpensePieChart.module.css';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../../context/Contexts';

function ExpensePieChart() {
  const { expenses } = useContext(ExpensesContext);

  const [data, setData] = useState([
    { name: 'Food', value: 0 },
    { name: 'Entertainment', value: 0 },
    { name: 'Travel', value: 0 },
  ]);

  const COLORS = ['#A000FF', '#FF9304', '#FDE006'];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {percent === 0 ? '' : `${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getTotalCategoryExpense = (category) => {
    return expenses.reduce((sum, expense) => {
      if (expense.category === category.toLowerCase())
        return parseInt(sum) + parseInt(expense.price);
      return sum;
    }, 0)
  }

  const setDataValuesFromExpenses = () => {
    setData(data.map((category) => {
      return { ...category, value: getTotalCategoryExpense(category.name) };
    }));
  }

  useEffect(() => {
    if (expenses.length > 0)
      setDataValuesFromExpenses();
  }, [expenses]);

  return (
    <div className={styles.Container}>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => {

            return (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          })}
        </Pie>
      </PieChart>
      <div className={styles.PieChartDetails}>
        {data.map((entry, index) => (
          <div key={index} className={styles.ColorsDetails}>
            <div className={styles.ColorSample} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExpensePieChart;