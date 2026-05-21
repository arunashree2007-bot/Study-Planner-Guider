import React from 'react'
import Navbar from '../navigation/Navbar';
import UserStore from '../store/Store';
import { useSelector } from 'react-redux';
import './Suggestions.css';
import  NavBar from '../navigation/Navbar'

const Suggestions=()=> {
  const User=useSelector((state)=>state.tasklist.tasklist) ;
  
  const pendingTask=User.filter(User =>
     User.status === 'pending'   
    );
  
  const completedTask=User.filter(User =>
     User.status === 'completed'  
  );

  const hardDifficulty = User.filter(User =>
    User.difficulty === 'hard'    
  );

  let suggest =[];

  suggest.push(`HARD TASKS : ${hardDifficulty.length}❤️‍🔥`)
 
  if(pendingTask.length > 0){
    suggest.push(`You have (${pendingTask.length})📝 pending tasks so complete them soon!`);
  }
   
  if(hardDifficulty.length >0){
    suggest.push('🔥start the hard tasks early💪🏻')
  }
    
  const today =new Date();  
  today.setHours(0,0,0,0);  
  User.forEach(User =>{
    if(!User.deadline)    
      return ;       

  const deadline =new Date(User.deadline);
 
  if(isNaN(deadline)){
    console.log(User.deadline);
    return;    
  }
  deadline.setHours(0,0,0,0);

  const diff =(deadline - today)/( 1000 * 60 * 60 * 24);
  console.log("diff :",diff);
  

  if(diff <=1 && diff>=0 && User.status === 'pending'){
    suggest.push(`⚠️Course : ${User.course} , Topic : ${User.topic} ➡️ deadline is near  ( 📅${User.deadline} ) `);
  }
   });
  return (
    <div>
       <Navbar/>
       
            <h1>💡Today's Suggestions</h1>
            <div id='sugdata'>
            {suggest.map((msg,index)=>{
          return <div style={{margin:'15px',fontSize:'24px'}} key={index}  >   
             {msg}
            </div>
         })}        
          </div>   
    </div>
  )
}

export default Suggestions;
