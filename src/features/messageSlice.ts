import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserProp {
  username: string;
  last_login: string;
  user_id: number;
}

export interface Message {
  timestamp: number;
  content: string;
  sender_id: number;
  receiver_id: number;
  receiver_external_id: number;
  room_external_id: number[];
  attachment?: string
}

interface getMessageProp {
  receiver_id: number;
  user_id: number;
}

interface messageState {
  message: Message;
  messages: Message[];
  roomMessages: Message[];
}

const initialState: messageState = {
  message: {} as Message,
  messages: [],
  roomMessages: [],
};

const config = {
  headers: {
    "Content-Type": "application/json",
    Authentication: `Bearer ${sessionStorage.getItem("token")}`,
  },
};

const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data || error.message;
  }
  return String(error);
};

export const sendMessage = createAsyncThunk(
  "sendMessage/message",
  async (
    { message, file }: { message: Message; file: File | null },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("message", JSON.stringify(message));
      if (file) {
        formData.append("file", file);
      }

      const response = await axios.post("/api/message", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authentication": `Bearer ${sessionStorage.getItem("token")}`,
        }
      });
      return response.data;
    } catch (error: unknown) {
      console.error("Failed to send message:", error);
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const sendRoomMessage = createAsyncThunk(
  "sendRoomMessage/roomMessage",
  async (
    { message, file }: { message: Message; file: File | null },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("message", JSON.stringify(message));
      if (file) {
        formData.append("file", file);
      }

      const response = await axios.post("/api/roomMessages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authentication": `Bearer ${sessionStorage.getItem("token")}`,
        }
      });
      return response.data;
    } catch (error: unknown) {
      console.error("Failed to send room message:", error);
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getMessagesAsync = createAsyncThunk<Message[], getMessageProp>(
  "getMessages/getMessages",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post<Message[]>("/api/getMessage", body, config);
      return response.data;
    } catch (error: unknown) {
      console.error("Failed to fetch messages:", error);
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getRoomMessagesAsync = createAsyncThunk<Message[], getMessageProp>(
  "getRoomMessages/getRoomMessages",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post<Message[]>("/api/getRoomMessages", body, config);
      return response.data;
    } catch (error: unknown) {
      console.error("Failed to fetch room messages:", error);
      return rejectWithValue(extractErrorMessage(error));
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
      })
      .addCase(getRoomMessagesAsync.fulfilled, (state, action) => {
        state.roomMessages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(sendRoomMessage.fulfilled, (state, action) => {
        state.roomMessages.push(action.payload);
      });
  },
});

export const getAllMessages = (state: { message: messageState }) =>
  state.message.messages;

export const getAllRoomMessages = (state: { message: messageState }) =>
  state.message.roomMessages;

export default messageSlice.reducer;
