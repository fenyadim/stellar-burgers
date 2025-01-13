import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '@utils-cookie';
import { setIsAuthChecked, setUser } from './userSlice';

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (formData: TRegisterData) => {
    const data = await registerUserApi(formData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (formData: TLoginData) => {
    const data = await loginUserApi(formData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUserThunk = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (formData: TRegisterData) => updateUserApi(formData)
);

export const logoutUserThunk = createAsyncThunk('user/logoutUser', async () =>
  logoutApi()
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then(({ user }) => dispatch(setUser(user)))
        .catch((e) => console.log(e))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);
