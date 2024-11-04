import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import './Score_chart.css'


export default function ChartScore({dataScore}) {


	const data = [
		{ name: 'score', value: dataScore * 100 },
	];


	return (
		<div className="CustomScore">
			<div className="title">Score</div>

			<ResponsiveContainer width="100%" height="100%" id="Responsive">
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						startAngle={70}
						endAngle={430 * dataScore + 70}
						innerRadius={"60%"}
						outerRadius={"70%"}
						dataKey="value"
						cornerRadius={10}
					>

						<Cell stroke="" fill="red" />
					</Pie>
				</PieChart>
			</ResponsiveContainer>

			<div className="Score">
				<div className="percentage">{dataScore * 100}%</div>
				<div className="message">de votre</div>
				<div className="message">objectif</div>
			</div>
		</div>
	);
}


