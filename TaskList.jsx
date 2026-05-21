import React, { useState,useEffect } from 'react'
import './TaskList.css';
import { v4 as uuidv4 } from 'uuid';
import {useDispatch} from 'react-redux'
import Navbar from '../navigation/Navbar';
import {useSelector} from 'react-redux';
import UserStore from '../store/Store';
import { deleteTasklist, markCompleted } from '../slice/UserSlice';
import { useNavigate } from 'react-router';
import { editTasklist,addTasklist,updateTasklist } from '../slice/UserSlice';

const TaskList = () => {

  const [clicked,setClicked]=useState(false);
  const User = useSelector((state)=>state.tasklist.tasklist);  

  const dispatch=useDispatch();  
  const navigate=useNavigate(); 
  const [button,setButton] =useState('');  

  const handleEdit=(User)=>{     
    dispatch(editTasklist(User));  
    navigate('/NewTask');  
  }
 
   const filteredTask = User.filter(User =>{
    if(button === 'pending'){       
      return User.status === 'pending';  
    }
     if(button === 'completed'){    
      return User.status === 'completed'    
     }
     return true;
   })


  return ( <>
    <Navbar/>
      <div  id='TaskList'>
       <h1>TaskList</h1>
       <hr></hr>
       <div id="TaskButton">
            
       <button style={{background : button ==='all'? 'blue':'firebrick'}} onClick={()=>setButton('all')} >All</button>  

       <button style={{background : button ==='pending'? 'blue':'firebrick'}}onClick={()=>setButton('pending')}>pending</button>
       <button style={{background : button ==='completed'? 'blue':'firebrick'}} onClick={()=>setButton('completed')}>completed</button>
    </div>
    </div>
        <div id="table">  
        <table > 
        
         { filteredTask && (<>   
            <thead>
              <tr>
            <th>Course</th>
            <th>Topic</th>
            <th>DeadLine</th>
            <th>Difficulty</th>
            <th>Status</th>
            <th>Action</th>
            <th>completed</th>
            </tr>
            </thead> 
            </>)}
      
          <tbody>
            {filteredTask.map((User)=>{ 
             return <tr key={User.id} id="data">   
  
             <td style={{color:'darkred',fontSize:'19px'}}>({User.course})</td> 
             <td style={{color:'darkgreen',fontSize:'19px',marginLeft:'20px'}}><strong>{User.topic}</strong></td>
             <td style={{marginLeft:'20px',fontSize:'19px'}}> <strong  style={{color:'darkorange',margin:'15px'}}>Due :</strong>{User.deadline}</td>
               <td style={{color:'purple',fontSize:'19px',marginLeft:'20px'}}><strong>{User.difficulty}</strong></td>
               <td style={{fontSize:'19px',marginLeft:'20px'}}><strong>{User.status}</strong></td>
     
             <td><button id="edit" onClick={()=>handleEdit(User)}>✍🏻</button>

                        
             <button className='del'onClick={()=>dispatch(deleteTasklist(User.id))}>🚮</button>
             </td>
             <td>
              <button  style={{
              
                padding:'5px',
                marginLeft:'20px',
                width:'50px'}} 
               onClick={()=>dispatch(markCompleted(User.id))} >✅</button>
             </td>
             </tr>
            })
        }
        </tbody>
        </table>
        </div>   
        
    </>
  );
};

export default TaskList
