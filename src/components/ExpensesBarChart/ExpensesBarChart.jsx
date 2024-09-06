import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer
} from "recharts";

export default function ExpensesBarChart() {
    const data = [
        { name: "Entertainment", value: 300 },
        { name: "Food", value: 704 },
        { name: "Travel", value: 3050 },
    ];

    console.log("data", data);
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
