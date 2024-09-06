import { useContext, useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer
} from "recharts";
import { ExpensesContext } from "../../context/Contexts";

export default function ExpensesBarChart() {
    const { expenses } = useContext(ExpensesContext);

    const [data, setData] = useState([
        { name: "Entertainment", value: null },
        { name: "Food", value: null },
        { name: "Travel", value: null },
    ]);

    const getTotalCategoryExpense = (category) => {
        return expenses.reduce((sum, expense) => {
            if (expense.category === category.toLowerCase())
                return parseInt(sum) + parseInt(expense.price);
            return sum;
        }, 0)
    }

    const setDataValuesFromExpenses = () => {
        setData(data.map((category) => {
            const totalCategoryExpenses = getTotalCategoryExpense(category.name);
            return { ...category, value: totalCategoryExpenses };
        }));
    }

    useEffect(() => {
        if (expenses.length > 0)
            setDataValuesFromExpenses();
    }, [expenses]);

    return (
        <BarChart
            layout="vertical"
            barSize={20}
            width={400}
            height={350}
            data={data}
            margin={{
                top: 0,
                right: 20,
                bottom: 0,
                left: 55,
            }}
        >
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
            <XAxis type="number" hide={true} />
            <Bar dataKey="value" stackId="a" fill="#8884d8" radius={[0, 50, 50, 0]} />
        </BarChart>
    );
}
