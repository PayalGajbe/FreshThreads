import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice'; 
import shopReducer from './features/shopSlice'; // Add more imports as needed

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add more reducers as needed
    shop:shopReducer,
  },
});