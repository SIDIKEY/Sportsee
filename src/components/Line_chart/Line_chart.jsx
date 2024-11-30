import React from "react";
import "./Line_chart.css";

import {
  LineChart,
  Line,
  Tooltip,
  YAxis,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        <p>{payload[0].value + " min"}</p>
      </div>
    );
  }
  return null;
};

const CustomCursor = (props) => {
  const { stroke, pointerEvents,width, height, points, className } = props;
  const { x, y } = points[0];
  return (
    <Rectangle
      x={x}
      y={y}
      fillOpacity={0.3}
      
      pointerEvents={pointerEvents}
      width={width}
      height={200}
      points={points}
      className={className}
      type="linear"
    />
  );
};

export default function ChartLine({ data }) {
  return (
    <div className="WrapperLine">
      <div className="titleLine">Durée moyenne des sessions</div>


      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ bottom: 10 }}>
          <Line
            type="monotone"
            dataKey="sessionLength"
            height={1}
            name="durée (min)"
            stroke="#FFFFFF"
            strokeWidth={2}
            dot={false}
            activeDot={{ fill: "white", stroke: "white" }}
            allowDataOverFlow={true}
          />
          <YAxis hide domain={["dataMin - 30", "dataMax + 30"]}  />

          <Tooltip
            wrapperStyle={{ fontWeight: 600 }}
            //cursor={<CustomCursor />}
            cursor={<CustomCursor />}
            content={<CustomToolTip />}
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
