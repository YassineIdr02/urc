import { configureStore } from '@reduxjs/toolkit';
import  userReducer  from '../features/userSlice';
import  messageReducer  from '../features/messageSlice';
import  roomReducer  from '../features/roomSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
        room: roomReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
