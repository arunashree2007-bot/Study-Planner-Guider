import {createSlice} from '@reduxjs/toolkit';

const initialState={
    tasklist:[],
    editTask:null,
}
const UserSlice = createSlice({
     name : 'Aruna',
     initialState,
     reducers :{
        editTasklist:(state,action)=>{
            state.editTask=action.payload
        },
        addTasklist :(state,action)=>{           
            state.tasklist =[...state.tasklist,action.payload];
        },
        deleteTasklist :(state,action)=>{
            state.tasklist = state.tasklist.filter(
                tasklist => tasklist.id!== action.payload);
        },
        updateTasklist:(state,action)=>{
            state.tasklist = state.tasklist.map((tasklist)=>
                tasklist.id === action.payload.id? {...tasklist,...action.payload} : tasklist);
           },
        markCompleted:(state,action)=>{
            const tasklist=state.tasklist.find(t=> t.id === action.payload);
            if(tasklist){
                tasklist.status='completed';
            }
        }
        // logout:(state,action)=>{
        //     state.tasklist=[];
        // },
        // loginTasklist:(state,action)=>{
        //   state.tasklist=action.payload;
        // }
     }
});

export const {addTasklist,deleteTasklist,editTasklist,updateTasklist,markCompleted} = UserSlice.actions;
export default UserSlice.reducer;
