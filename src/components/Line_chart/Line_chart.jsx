import React from "react";
import "./Line_chart.css";

import { LineChart, Line, Tooltip, XAxis, ResponsiveContainer } from "recharts";

export default function ChartLine({ data }) {
  console.log(data);
  return (
    <div className="WrapperLine">
      <div className="title">Durée moyenne des sessions</div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ bottom: 10 }}>
          <Line
            type="monotone"
            dataKey="sessionLength"
            name="durée (min)"
            stroke="#FFFFFF"
            strokeWidth={1}
            dot={false}
          />

          <XAxis dataKey="sessionLength" />

          <Tooltip
            cursor={false}
            wrapperStyle={{ outline: "none", fontWeight: 600 }}
            labelFormatter={(value) => `${value} min`}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="legend">
        <p>L</p>
        <p>M</p>
        <p>M</p>
        <p>J</p>
        <p>V</p>
        <p>S</p>
        <p>D</p>
      </div>
    </div>
  );
}
