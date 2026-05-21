import React from 'react'
import Navbar from '../navigation/Navbar'
import { useSelector } from 'react-redux'
import UserStore from '../store/Store';
import {PieChart,Pie,Cell,Tooltip,Legend} from 'recharts'
import './Stats.css'
const Stats = () => {
   const tasks=useSelector((state)=>state.tasklist.tasklist) || [];
  //  console.log(tasks);

            //filter will be perform like an array[it will set a values depend on the condition]
  const pending =tasks.filter(t => t.status === 'pending').length;       // to  calculate the length of pending tasks
  const completed =tasks.filter(t => t.status === 'completed').length;   // to  calculate the length of completed tasks
  const easy=tasks.filter(t => t.difficulty === 'easy').length;
  const medium=tasks.filter(t => t.difficulty === 'medium').length;
  const hard=tasks.filter(t => t.difficulty === 'hard').length;
  // console.log("pending Tasks: ",pending);  
  // console.log("completed Tasks :",completed);  

  const data=[
    {name : 'PENDING TASKS',value : pending},  // we pass the length of pending with the unique name'pending' and show when hover the circle{especially in red}
    {name :'COMPLETED TASKS',value: completed},   // we pass the length of completed with the unique name'completed' and show when hover the circle{especially in green}
    {name: 'EASY TASKS',value: easy},
    {name:'MEDIUM TASKS',value: medium},
    {name:'HARD TASKS',value: hard},
  ];

  const colors = ["#FF4D4D","#4CAF50","#5DADE2","#E6A23C","#5D6D7E"]; // to set the colors 0->red | 1->green

  const percentage=({percent})=>    // the value percent will be passed and calculated by recharts internally
              // eg.,
              // pending tasks length =1  completed tasks length=3 
              // recharts calculation :    1+3 = 4 and  divide (1/4)=0.25
                            // (3/4)=0.75 
    `${(percent *100).toFixed(0)}% `  // this will be convert as (0.25 *100)=25%  and (0.75 * 100)=75%
                 // toFixed(0)  => it will convert the decimal value as whole for eg., (0.256 *100 => 25.6)but we use this{toFixed (0)=>27%}
                 // toFixed(1)  =>  it will show the actual decimal value that is(0.256 *100.toFixed(1))=>25.6%    
  return (
    <div>
      <Navbar/>
      <h1 style={{textAlign:'center',padding:'5px'}}>📊Task Status Flow</h1>
      <hr></hr>
      <div id='chart' >
            {/* <PieChart/> => is for to hold the container(like<provider/>) of the chart {to wrap it}*/}
            {/* <Pie/> => is for to tell the type of the chart */}
            {/* <Tooltip/> => is for to  show the details of the charts (the percentage,color to represent like these) */}
            {/* <cell fill={}/> => is to show the chart with specific declared colors */}
            {/* <Legend/> => is for the label to understand which color for which data represent in */}
        <PieChart width={1200} height={300} >
          <Pie
             data={data} //the actual piechart appear depend on (%) by the data(pending,completed list)
                               //          const data=[
                             // {name : 'pending',value : pending},  
                            // {name :'completed',value: completed}]
              cx='50%'  //X-axis position(horizontal) 50% center      |--|--|
              cy='50%'  //y-axis position(vertical)  50% center  
                 // cx and cy ----> place pie exactly in center
              outerRadius={110} // this value to set the size of the circle
              dataKey='value'  // key perform like unique card[i pass the values from data]
                             // if pending length : 2 , completed length : 3 [2,3  is a value]
              label={percentage} // it show how  many percentage would  be done and not done
             >
              {data.map((entry,index)=>(      // if we not have this,the chart have a grey(default color) we can't understood which for completed and pending
                <Cell key={index}  fill={colors[index]}/>  // <cell fill={}/> it gives the color of slice
                // index[1]="red" index[2]="green" {'Cell' will be set the color}
              ))}
             </Pie>  
             <Tooltip/>  
             <Legend         // Legend => for to place the denotable variable(green=>completed and red=>pending)
             layout='vertical'    // to set the identificated varible(label) in 'vertical'
             align='left'         // right side of the pie chart
             verticalAlign='middle'    
             iconType='circle' 
                 // the denotable icon represented      
             />
        </PieChart>
      </div>
      </div>
  )
}

export default Stats;