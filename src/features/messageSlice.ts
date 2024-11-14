import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../model/common"
import axios from 'axios';

export interface UserProp {
    username: string,
    last_login: string,
    user_id: number
}

export interface Message{
    content : string,
    sender_id : number;
    receiver_id : number;
}


interface messageState {
    message: Message,
    messages: Message[]
}

const initialState: messageState = {
    message: {} as Message,
    messages: []
};

const config = {
    headers: {
        "Content-Type": "application/json",
        "Authentication": `Bearer ${sessionStorage.getItem("token")}`,
    },
};

export const sendMessage = createAsyncThunk("sendMessage/message", async (message: Message, { rejectWithValue }) => {
    try {
        const response = await axios.post("/api/message", message);
        return response.data;
    } catch (error) {
        console.error("Failed to register:", error);

    }
});

// export const getUsers = createAsyncThunk<UserProp[]>(
//     "getUsers/users",
//     async () => {
//         try {
//             const response = await axios.get<UserProp[]>("/api/users", config);
//             console.log(response);
//             return response.data;
//         } catch (error) {
//             console.error("Failed to fetch users:", error);
//             throw error;
//         }
//     }
// );


const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
            // .addCase(getUsers.fulfilled, (state, action) => {
            //     state.users = action.payload
            // })

    },
});



// export const getAllUsers = (state : {user : userState}) => state.user.users;
export default messageSlice.reducer;
