import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from '../slice/UserSlice';

const Store = configureStore({
    reducer :{
        tasklist : TaskReducer ,
    }
});
export default Store;