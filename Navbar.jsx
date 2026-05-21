import React from 'react';
import { Link,useNavigate} from 'react-router';
import './Navbar.css'
import Store from '../store/Store';
import { addTasklist}from '../slice/UserSlice'
import { useSelector,useDispatch } from 'react-redux';
const Navbar=()=>{
   const User=useSelector((state)=>state.tasklist.tasklist)
    return(
        <div>
         <div   id="navh">
        <h1>STUDY  PLANNER  GUIDE</h1>
         <ul>
           {!User &&  <Link to='/login' style={{marginRight:'150px'}}>login </Link> }
           {User && <>
            <Link to='/newtask' > NewTask </Link>
            <Link to='/tasklist' > Tasklist</Link>
            <Link to='/timer' >Timer</Link>
            <Link to='/suggestions' > Suggestions </Link>
            <Link to='/stats' > flowchart</Link> 
            </>}
      </ul>
        
        </div>
        </div>
    )
}
export default Navbar; 