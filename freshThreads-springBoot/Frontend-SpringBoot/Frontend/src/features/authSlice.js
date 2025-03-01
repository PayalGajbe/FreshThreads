import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/users/signup', userData);
      
      console.log("Signup Response:", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Signup failed');
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:8080/users/signin', userData);
   
    const { jwt, mesg } = response.data;

    if (jwt) {
      return { token: jwt, message: mesg }; // Adjust the payload to match what's expected
    } else {
      return rejectWithValue('Login failed');
    }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});




// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    userRoles: null,
    email: null,
    userId: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.email = null;
      state.userId = null;
      state.userRoles = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.userRoles = action.payload.userRoles;
        state.email = action.payload.user?.email || '';
        state.userId = action.payload.user?.userId || null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(fetchUserProfile.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchUserProfile.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload;
      //   state.error = null;
      // })
      // .addCase(fetchUserProfile.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;