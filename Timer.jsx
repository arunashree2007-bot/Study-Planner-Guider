import React,{useState,useEffect} from 'react';
import './Timer.css';
import Navbar from '../navigation/Navbar';
const Timer = () => {
  const [time,setTime]=useState(0);   //to store the seconds => time   update the second =>setTime
  const[isRunning,setIsRunning]=useState(false);   // timer stopped now coz 'false' state
  useEffect(()=>{
      let interval;   //it is a js builtin func
      // 👆🏻 to store timer reference like  ID {each time the setInterval do its tasks then that has a id ,that id will be store in it(interval) }
      if(isRunning){   // if true;
        interval=setInterval(()=>{  //  setInterval => runs every 1000ms =1 sec {start repeating tasks}
          setTime(prev => prev+1);   //  to increment the time until reach 1000;
        },1000)
      }
      return()=> clearInterval(interval); // clearInterval => to stop the timer 
      },[isRunning]);         
  // console.log(time);
  
  const reset=()=>{
    setTime(0);        // to set a time again 0
    setIsRunning(false); // to stop the timer
  }
  const formatTime=(time)=>{    // time =125
    const min = Math.floor(time/60);     // ( 125 /60 = 2.08)    Math.floor(2.08)=2 min 
    const sec = time % 60;           // 125 % 60 => 5 sec
    return `${String(min).padStart(2,'0')} :${String(sec).padStart(2,'0')} `
    // padStart is a js builtin function it is perform like a string to append the value
    //  without padStart ,its looks lke [2:5]--with { 02 : 05} it ensures 2 digits
  }
  return (<>
    <Navbar/>
    <div id='Timer'>
        <h1>Focus Timer</h1>
        <hr></hr>
        <div id='TimerContent'>
            <h2>focus time</h2>
            <button id='start' onClick={()=>setIsRunning(true)}>START</button>
            <button id='pause'onClick={()=>setIsRunning(false)}>PAUSE</button>
            <button id='restart' onClick={reset}><strong>⟳</strong></button>
        </div>
        <div style={{fontSize:'70px',margin:'30px',textAlign:'center',padding:'40px'}}>
           {formatTime(time)}  
        </div>
    </div>
    </>
  )
}

export default Timer