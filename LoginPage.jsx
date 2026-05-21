import React from 'react'
import Navbar from '../navigation/Navbar'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import {loginTasklist } from '../slice/UserSlice'
import Store from '../store/Store'
const LoginPage = () => {
    const user=useSelector((state)=>state.tasklist.tasklist);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const login=()=>{
        dispatch(loginTasklist({
            user:'aruna'
        }));
        navigate('/')
    }
  return (
    <div>
        <Navbar/>
        <h1 style={{textAlign:'center'}}>LoginPage</h1>
        <button style={{padding:'10px',marginLeft:'47%',width:'90px'}} onClick={login}>login</button>
    </div>
  )
}

export default LoginPage