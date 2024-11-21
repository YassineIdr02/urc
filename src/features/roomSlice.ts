import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export interface RoomProp {
    name: string,
    room_id: number
}

export interface roomState {
    rooms: RoomProp[],
    room: RoomProp
}

const initialState: roomState = {
    rooms: [],
    room: {} as RoomProp,
};

const config = {
    headers: {
        "Content-Type": "application/json",
        "Authentication": `Bearer ${sessionStorage.getItem("token")}`,
    },

};

export const getRoomsAsync = createAsyncThunk<RoomProp[]>(
    "getRooms/getRooms",
    async () => {
      try {
        const response = await axios.get("/api/getRooms", config);
        return response.data;
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        throw error; 
      }
    }
  );

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRoomsAsync.fulfilled, (state, action) => {
                state.rooms = action.payload;
            });
    },
});

export const getAllRooms = (state: { room: roomState }) => state.room.rooms;
export const getRoom = (state: { room: roomState }, room_id: number) =>
    state.room.rooms.find(room => room.room_id === room_id)

export default roomSlice.reducer;
