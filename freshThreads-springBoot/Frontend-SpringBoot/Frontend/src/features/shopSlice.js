import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchShopDetails = createAsyncThunk('shop/fetchDetails', async (shopId, { getState, rejectWithValue }) => {
  try {
    console.log(shopId)
    const { token } = getState().auth;
    console.log('Token:', token);  // Debugging
    const response = await axios.get(`http://localhost:8080/shops/${shopId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Response:', response.data);  // Debugging
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    return rejectWithValue(error?.response?.data || 'Unknown error');
  }
});

const shopSlice = createSlice({
  name: 'shop',
  initialState: { details: {}, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShopDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchShopDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default shopSlice.reducer;
