import React from 'react';
import "./Radar_chart.css"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Text} from 'recharts';
import PropTypes from 'prop-types'







export default function RadChart({dataPerf}) {

	
    const formatData = dataPerf?.data?.map((data) => {
                
        switch (data.kind) {
            case 1:
                return { ...data, kind: 'Intensité'};
            case 2:
                return { ...data, kind: 'vitesse' };
            case 3:
                return { ...data, kind: 'Force' };
            case 4:
                return { ...data, kind: 'Endurance' };
            case 5:
                return { ...data, kind: 'Energie' };
            case 6:
                return { ...data, kind: 'Cardio'  };
            default:
                return {...data };
        }
        
    });
    
    

   

function renderPolarAngleAxis ({ payload, x, y, cx, cy, ...rest }) {

    const newData = formatData

    console.log(newData)
    newData.map((data) => {
        console.log(payload.value)
        

                
        
        
    });
   
    
        return (
			<Text
				{...rest}
				verticalAnchor="middle"
				y={y + (y - cy) / 10}
				x={x + (x - cx) / 10}
				fill="#FFFFFF"
				fontSize="0.75rem"
			>
				{payload.value}
			</Text>
		)
    
}

    
	

	
  
  
    return (

        <div className='CustomRadar' >
      <ResponsiveContainer width="100%" height="100%"  >
       
     
          

       

       <RadarChart  outerRadius="55%"  data={formatData} >
          <PolarAngleAxis dataKey="kind" stroke='white' strokeWidth={1}  dy={2} tickSize={15} tick={(props) => renderPolarAngleAxis(props)}/>
          <PolarGrid gridType='polygon' radialLines={false} polarRadius={[0, 4, 18, 40, 60, ]} ></PolarGrid>
          
          
          <Radar  name="performance" dataKey="value" stroke="red" fill="red" fillOpacity={0.6} />
        </RadarChart>





      </ResponsiveContainer>

      </div>
    
    );
  
}

