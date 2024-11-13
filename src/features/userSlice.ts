import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {User} from "../model/common"
import axios from 'axios';

const initialState = {
    user : {} as User
};

const config = {
    headers: {
        "Content-Type":"application/json",
        "Authentication": `Bearer ${sessionStorage.getItem("token")}`,
    },
  };

export const registerUser = createAsyncThunk("registerUser/register", async (user : any, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/register", user);
        return response.data;
    } catch (error) {
        console.error("Failed to register:", error);
        
    }
});

export const getUsers = createAsyncThunk("getUsers/users", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/api/users",config );
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.error("Failed to register:", error);
        
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user.username = action.payload.username;
                state.user.email = action.payload.email;
            })
            
    },
});

export default userSlice.reducer;
