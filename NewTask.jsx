import React,{useState,useEffect} from 'react';
import './NewTask.css';
import Navbar from '../navigation/Navbar';
import { addTasklist,editTasklist,updateTasklist} from '../slice/UserSlice'
import {useDispatch} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
const NewTask =()=>{
   const dispatch =useDispatch();    // to fetch the data from the slice component
   const navigate=useNavigate();     // to navigate the page
   const editTask =useSelector((state)=>state.tasklist.editTask);    //to get the data from the another object to edit the dataa
   const[difficulty,setDifficulty]=useState('');
   const[user,setUser]=useState([]);   //to hold the data in array and manage the data state
   const [task,setTask]=useState({ 
      id:'uuidv4',  //  to manage the state of  input values
      course :'',
      topic  :'',
      deadline  :'', 
      difficulty:'',
      status:'pending',         
   });
        
   const InputFunction=(event)=>{       //handle input function
      const  {name,value}=event.target;  // to get the name,values and that value should be taken as whole(e.target)
      setTask((curr)=>{  
            return{ 
                    ...curr,  //  to get the current values
                    [name]: value};  // with specific name(course,topic) with its values
            });
   }  
   const handleDifficult=(level)=>{       //handle difficulty function  
          setTask((curr)=>{
            return{
            ...curr,   //to get the current values
            difficulty :level,  // level : (easy,medium,hard)
         }
          })
   }
  
   const addTask=(e)=>{
      e.preventDefault();   // to avoid the page rerendered repeadedly
      dispatch(addTasklist(task));  //to  get the values after processing by addTaskList from slice  and place it with task componene(course,topic,deadline)
      setUser((curr)=>[...curr,task]) ; //to receive the value and store in arrays
      setTask({              // after adding the data then the state should be empty then only we can add the  new data
           id:uuidv4(),
           course :'',
           topic  :'',
           deadline  :'', 
           status:'pending' ,
      })                      // these will change the state again empty
   }
   console.log(user);
   
   const cancelTask=()=>{    
      setTask({                // the state should be empty after user clicks the cancel button
           course :'',
           topic  :'',
           deadline  :'',
           difficulty:'',
           status:'pending',
      })
       dispatch(editTasklist(null)) // to change the state (action.payload)becomes null then only we could add the task(set as AddTask button)if not,it will trap in edit process
   }
   useEffect(()=>{        
      if(editTask){     // whenever the process comes to edit then that time it will be start its work
         setTask({
            course:editTask.course,   //it place the exist value of course in (input course box)
            topic:editTask.topic,      //it place the exist value of topic in (input topic box)
            deadline:editTask.deadline   //it place the exist value of deadline in (input deadline box)
         })
      }
   },[editTask]);  //  when the user click the edit button then it start to handle data
   const handleSubmit=(e)=>{  
      e.preventDefault();   
    if(editTask){      // data comes from editprocess with id
      dispatch(updateTasklist({    // to call the update process from slice
         ...task,                 // to handle the task component(course,topic,deadline)
         id : editTask.id,     // compare whether the id is exist or not
        }));
      dispatch(editTasklist(null));   // if it exist,it will change data and turn into null 
      }else{
         dispatch(addTasklist({   // if the is not exist,then add new one by this
            id:uuidv4(),  //create new id
            ...task    //handle task component
         }));
      }
     navigate('/tasklist');  //after updation,pages goes to tasklist page
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
                value={task.course}  //to receive the value
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
                { editTask ?   // when the user wants to edit then these two button will show up(update,cancel)
                ( <> 
                   <button type='button' id='addTask' onClick={handleSubmit}>update</button>
                   <button  type='button' id='cancelTask'onClick={cancelTask}>cancel</button>
                </> )
                :   // if not,show the addTask button
                <button type='button' id='addTask' onClick={addTask}>Add Task</button> }
                
           </div>
         
        </form>
        </div>
    </>
   )
}

export default NewTask ;
