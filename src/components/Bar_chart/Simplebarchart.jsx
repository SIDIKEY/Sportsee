import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default function Simplebarchart({ data }) {
 
   
    return (
      <ResponsiveContainer width="100%" aspect={4}>
        <BarChart
        data={data}
        
        barSize={12}
          width={500}
          height={300}
          
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
						tick={{ fill: '#9B9EAC' }}
						tickLine={false}
						stroke="#DEDEDE"
						strokeWidth={2}
						tickMargin={16}
						tickFormatter={(day) => new Date(day).getDate()} 
          />

          <YAxis orientation='right'   dataKey="calories" domain={[10, 400]}/>
          <Tooltip />
          <Legend />
          
          
          <Bar name="Poids (kg)" dataKey="kilogram"   fill="#000" radius={[10, 10, 0, 0]} activeBar={<Rectangle fill="black" stroke="black"  />} />
          <Bar name="Calories (kcal)" dataKey="calories" fill="#FF0000" radius={[10, 10, 0, 0]} activeBar={<Rectangle fill="red" stroke="red" />} />
        </BarChart >
      </ResponsiveContainer>
    );
  
}
