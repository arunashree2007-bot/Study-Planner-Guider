import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router';
import NewTask from './pages/NewTask';
import TaskList  from './pages/TaskList';
import Timer from  './pages/Timer';
import Suggestions from './pages/Suggestions';
import  Stats from './pages/Stats';
import Navbar from './navigation/Navbar';
import Home from './pages/Home';
// import LoginPage from './pages/LoginPage';

const App=()=>{
  return(
    
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      {/* <Route path='/login' element={<LoginPage/>}/> */}
      <Route path='/newtask' element={<NewTask/>}/>
      <Route path='/tasklist' element={<TaskList/>}/>
      <Route path='/timer' element={<Timer/>}/>
      <Route path='/suggestions' element={<Suggestions/>}/>
      <Route path='/stats' element={<Stats/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;