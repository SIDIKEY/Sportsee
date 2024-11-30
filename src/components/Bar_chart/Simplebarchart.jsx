import React from "react";
import "./Simplebarchart.css"
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{payload[0].value + "kg"}</p>
        <p>{payload[1].value + "Kcal"}</p>
      </div>
    );
  }

  return null;
};




export default function Simplebarchart({ data }) {
  return (
    <ResponsiveContainer width="95%" aspect={3.2}>
      <div className="title">Activité quotidienne</div>
      <BarChart
        data={data}
        barSize={12}
        width={500}
        height={150}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          //tick={{ fill: "#9B9EAC" }}
          tickLine={false}
          //stroke="red"
          //strokeWidth={19}
          //tickMargin={16}
          tickFormatter={(day) => new Date(day).getDate()}
        />

        <YAxis orientation="right" dataKey="calories" domain={[10, 400]} axisLine={false} tickLine={false} />
        <Legend layout="horizontal" iconType="circle" verticalAlign="top" align="right" />
        <Tooltip  cursor={{fill:"#f008"}} content={<CustomTooltip />} />

        <Bar
          name="Poids (kg)"
          dataKey="kilogram"
          fill="#000"
          radius={[10, 10, 0, 0]}
          //activeBar={<Rectangle fill="grey" stroke="blue" />}
        />
        <Bar
          name="Calories (kcal)"
          dataKey="calories"
          fill="#FF0000"
          radius={[10, 10, 0, 0]}
          //activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
