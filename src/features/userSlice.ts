import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../model/common"
import axios from 'axios';

export interface UserProp {
    username: string,
    last_login: string,
    user_id: number,
    external_id: number
}

export interface userState {
    user: User,
    users: UserProp[]
}

const initialState: userState = {
    user: {} as User,
    users: []
};

const config = {
    headers: {
        "Content-Type": "application/json",
        "Authentication": `Bearer ${sessionStorage.getItem("token")}`,
    },
};

export const registerUser = createAsyncThunk("registerUser/register", async (user: any, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/register", user);
        console.log();

        return response.data;
    } catch (error) {
        console.error("Failed to register:", error);

    }
});

export const getUsers = createAsyncThunk<UserProp[]>(
    "getUsers/users",
    async () => {
        try {
            const response = await axios.get<UserProp[]>("/api/users", config);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch users:", error);
            throw error;
        }
    }
);


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
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })

    },
});



export const getAllUsers = (state: { user: userState }, user_id: number) => 
  state.user.users.filter(user => user.user_id !== user_id);

export const getUser = (state: { user: userState }, user_id: number) => 
    state.user.users.find(user => user.user_id === user_id);

export default userSlice.reducer;
