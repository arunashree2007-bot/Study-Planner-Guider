import React,{useState,useEffect} from 'react';
import './NewTask.css';
import Navbar from '../navigation/Navbar';
import { addTasklist,editTasklist,updateTasklist} from '../slice/UserSlice'
import {useDispatch} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
const NewTask =()=>{
   const dispatch =useDispatch();    
   const navigate=useNavigate();     
   const editTask =useSelector((state)=>state.tasklist.editTask);   
   const[difficulty,setDifficulty]=useState('');
   const[user,setUser]=useState([]);  
   const [task,setTask]=useState({ 
      id:'uuidv4', 
      course :'',
      topic  :'',
      deadline  :'', 
      difficulty:'',
      status:'pending',         
   });
        
   const InputFunction=(event)=>{       
      const  {name,value}=event.target;  
      setTask((curr)=>{  
            return{ 
                    ...curr,  
                    [name]: value}; 
            });
   }  
   const handleDifficult=(level)=>{         
          setTask((curr)=>{
            return{
            ...curr,   
            difficulty :level,  
         }
          })
   }
  
   const addTask=(e)=>{
      e.preventDefault();   
      dispatch(addTasklist(task));  
      setUser((curr)=>[...curr,task]) ; 
      setTask({             
           id:uuidv4(),
           course :'',
           topic  :'',
           deadline  :'', 
           status:'pending' ,
      })                      
   }
   console.log(user);
   
   const cancelTask=()=>{    
      setTask({              
           course :'',
           topic  :'',
           deadline  :'',
           difficulty:'',
           status:'pending',
      })
       dispatch(editTasklist(null)) 
   }
   useEffect(()=>{        
      if(editTask){     
         setTask({
            course:editTask.course,   
            topic:editTask.topic,      
            deadline:editTask.deadline   
         })
      }
   },[editTask]); 
   const handleSubmit=(e)=>{  
      e.preventDefault();   
    if(editTask){     
      dispatch(updateTasklist({    
         ...task,                
         id : editTask.id,     
        }));
      dispatch(editTasklist(null));  
      }else{
         dispatch(addTasklist({   
            id:uuidv4(), 
            ...task   
         }));
      }
     navigate('/tasklist');  
  } ;
  
   return  (
    <>
    <Navbar/>
    <div id='NewTask'>
        <h1> NEW TASK</h1>
        <hr style={{width:'98%'}}></hr>
        <form id='NewTaskForm' onSubmit={addTask}>
            <label>Subject :</label>
            <input
                type='text'
                name='course'
                value={task.course}  
                onChange={InputFunction}  
                placeholder='Enter the course'>
           </input><br></br>
            <label>Topic   :</label>
            <input
                type='text'
                name='topic'
                placeholder='Enter The Topics'
                value={task.topic}
                onChange={InputFunction} ></input><br></br>
            <label>Deadline  :</label>
            <input 
               type='date'
               name='deadline' 
               value={task.deadline}
               onChange={InputFunction}></input>
            <label>Difficulty :</label>
            <button type='button' id='easy' onClick={()=>handleDifficult('easy')}> Easy  </button>
            <button type='button' id='medium' onClick={()=>handleDifficult('medium')}> Medium </button>
            <button type='button' id='hard' onClick={()=>handleDifficult('hard')}> Hard </button> <br></br>
            <div>
                { editTask ?  
                ( <> 
                   <button type='button' id='addTask' onClick={handleSubmit}>update</button>
                   <button  type='button' id='cancelTask'onClick={cancelTask}>cancel</button>
                </> )
                :   
                <button type='button' id='addTask' onClick={addTask}>Add Task</button> }
                
           </div>
         
        </form>
        </div>
    </>
   )
}

export default NewTask ;
