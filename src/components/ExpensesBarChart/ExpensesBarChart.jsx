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
        { name: "Entertainment", value: 0 },
        { name: "Food", value: 0 },
        { name: "Travel", value: 0 },
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
            return { ...category, value: getTotalCategoryExpense(category.name) };
        }));
    }

    useEffect(() => {
        if (expenses.length > 0)
            setDataValuesFromExpenses();
    }, [expenses]);

    return (
        <ResponsiveContainer width='100%' height='100%'>
            <BarChart
                layout="vertical"
                barSize={20}
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
        </ResponsiveContainer>
    );
}
