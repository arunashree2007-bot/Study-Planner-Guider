import React from 'react'
import Navbar from '../navigation/Navbar'
import { useSelector } from 'react-redux'
import UserStore from '../store/Store';
import {PieChart,Pie,Cell,Tooltip,Legend} from 'recharts'
import './Stats.css'
const Stats = () => {
   const tasks=useSelector((state)=>state.tasklist.tasklist) || [];
  const pending =tasks.filter(t => t.status === 'pending').length;       
  const completed =tasks.filter(t => t.status === 'completed').length;  
  const easy=tasks.filter(t => t.difficulty === 'easy').length;
  const medium=tasks.filter(t => t.difficulty === 'medium').length;
  const hard=tasks.filter(t => t.difficulty === 'hard').length;
  const data=[
    {name : 'PENDING TASKS',value : pending}, 
    {name :'COMPLETED TASKS',value: completed},   
    {name: 'EASY TASKS',value: easy},
    {name:'MEDIUM TASKS',value: medium},
    {name:'HARD TASKS',value: hard},
  ];

  const colors = ["#FF4D4D","#4CAF50","#5DADE2","#E6A23C","#5D6D7E"]; 

  const percentage=({percent})=>    
             
    `${(percent *100).toFixed(0)}% ` 
                
    <div>
      <Navbar/>
      <h1 style={{textAlign:'center',padding:'5px'}}>📊Task Status Flow</h1>
      <hr></hr>
      <div id='chart' >
            
        <PieChart width={1200} height={300} >
          <Pie
             data={data} 
              cx='50%'  
              cy='50%'  
              outerRadius={110} 
              dataKey='value'  
              label={percentage} 
             >
              {data.map((entry,index)=>(    
                <Cell key={index}  fill={colors[index]}/>  
              ))}
             </Pie>  
             <Tooltip/>  
             <Legend        
             layout='vertical'    
             align='left'      
             verticalAlign='middle'    
             iconType='circle' 
                
             />
        </PieChart>
      </div>
      </div>
  )
}

export default Stats;
