import { configureStore } from "@reduxjs/toolkit";
import autehnticationSliceReducer from "./authenticationSlice";




export default configureStore({
    reducer:{
        authentication_user:autehnticationSliceReducer,
    }
})