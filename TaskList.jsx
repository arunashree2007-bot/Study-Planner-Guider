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
  const User = useSelector((state)=>state.tasklist.tasklist);  //to get the data by using useSelector [it give the correct specific value]

  const dispatch=useDispatch();  //  to get that data to print by using dispatch
  // console.log(User);
  const navigate=useNavigate();  //to navigate the page
  const [button,setButton] =useState('');  //initial state of the button is empty/we could give something in it

  const handleEdit=(User)=>{      // these func used to edit the data{transfer the data}
    dispatch(editTasklist(User));  // go to edit process
    navigate('/NewTask');  // navigate to newTask to update
  }
  // console.log(User.length);
  
  //filter => to create a new map according to the conditions
   const filteredTask = User.filter(User =>{
    if(button === 'pending'){       // either the data status is pending then that will be resides in [filteredTask]
      return User.status === 'pending';  // return status is pending
    }
     if(button === 'completed'){    // or the data status is compeled then that will be resides in [filteredTask]
      return User.status === 'completed'    // return status is pending
     }
     return true;
   })


  return ( <>
    <Navbar/>
      <div  id='TaskList'>
       <h1>TaskList</h1>
       <hr></hr>
       <div id="TaskButton">
               {/* if the button state is all then show all the data */}
       <button style={{background : button ==='all'? 'blue':'firebrick'}} onClick={()=>setButton('all')} >All</button>  

       <button style={{background : button ==='pending'? 'blue':'firebrick'}}onClick={()=>setButton('pending')}>pending</button>
       <button style={{background : button ==='completed'? 'blue':'firebrick'}} onClick={()=>setButton('completed')}>completed</button>
    </div>
    </div>
        <div id="table">  
        <table > 
           {/* when the button state is 'all' these content will show */}
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
          {/* <hr style={{width:'340%',display:'block'}}></hr> */}
          <tbody>
            {filteredTask.map((User)=>{ 
             return <tr key={User.id} id="data">   
  
             <td style={{color:'darkred',fontSize:'19px'}}>({User.course})</td> 
             <td style={{color:'darkgreen',fontSize:'19px',marginLeft:'20px'}}><strong>{User.topic}</strong></td>
             <td style={{marginLeft:'20px',fontSize:'19px'}}> <strong  style={{color:'darkorange',margin:'15px'}}>Due :</strong>{User.deadline}</td>
               <td style={{color:'purple',fontSize:'19px',marginLeft:'20px'}}><strong>{User.difficulty}</strong></td>
               <td style={{fontSize:'19px',marginLeft:'20px'}}><strong>{User.status}</strong></td>
      {/* IMPORTANT ONE : WE SHOULD CALL THE FUNCTION LIKE ()=>{ } IF NOT IT THROUGH ERROR */}
                        {/* to edit the data via those function */}
             <td><button id="edit" onClick={()=>handleEdit(User)}>✍🏻</button>

                        {/* to delete the data via those function */}
             <button className='del'onClick={()=>dispatch(deleteTasklist(User.id))}>🚮</button>
             </td>
             <td>
              <button  style={{
                // border:'none',
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