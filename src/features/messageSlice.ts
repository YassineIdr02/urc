import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export interface UserProp {
    username: string,
    last_login: string,
    user_id: number
}

export interface Message {
    
    content: string,
    sender_id: number;
    receiver_id: number;
}
interface getMessageProp {
    receiver_id: number,
    user_id: number
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

export const sendMessage = createAsyncThunk(
    "sendMessage/message",
    async (message: Message, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/message", message);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error("Failed to register:", error);
        }
    });

export const getMessagesAsync = createAsyncThunk<Message[], getMessageProp, { rejectValue: string }>(
    "getMessages/getmessages",
    async (body, { rejectWithValue }) => {
        try {
            const response = await axios.post<Message[]>("/api/getMessage", body, config);
            console.log(response);
            return response.data;
        } catch (error: any) {
            console.error("Failed to fetch messages:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMessagesAsync.fulfilled, (state, action) => {
                state.messages = action.payload;
            });
    },
});


export const getAllMessages = (state: { message: messageState }) => state.message.messages;
export default messageSlice.reducer;
