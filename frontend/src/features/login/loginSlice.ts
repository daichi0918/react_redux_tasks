import { createAsyncThunk } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import axios from "axios"
import type { RootState } from "../../app/store"

const apiUrl = "http://localhost:8080/api/auth"
const token = localStorage.localJWT

/* 非同期系の関数はsliceの外で定義しておくとのこと */
export const fetchAsyncLogin = createAsyncThunk<
  any, // 成功時の返り値の型（適切な型があれば変更してください）
  { email: string; password: string } // 引数の型を指定
>("login/post", async (auth, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${apiUrl}/sign_in`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res.data
  } catch (error) {
    return rejectWithValue("ログインに失敗しました")
  }
})

export const fetchAsyncRegister = createAsyncThunk<
  any, // 成功時の返り値の型（適切な型が分かれば変更）
  { name: string; email: string; password: string } // 引数の型を指定
>("login/register", async (auth, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${apiUrl}/sign_up`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res.data
  } catch (error) {
    return rejectWithValue("登録に失敗しました")
  }
})

// loginしているユーザーのidとユーザーネーム取得
export const fetchAsyncProf = createAsyncThunk<any>(
  "login/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${apiUrl}/authentication`,
        {}, // bodyは空
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return res.data
    } catch (error) {
      return rejectWithValue("ユーザー情報の取得に失敗しました")
    }
  },
)

export const loginSlice = createAppSlice({
  name: "login",
  initialState: {
    name: "",
    authen: {
      email: "",
      password: "",
    },
    isLoginView: true,
    profile: {
      id: 0,
      email: "",
    },
  },
  reducers: {
    editName(state, action) {
      state.name = action.payload
    },
    editEmail(state, action) {
      state.authen.email = action.payload
    },
    editPassword(state, action) {
      state.authen.password = action.payload
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.accessToken)
      action.payload.accessToken && (window.location.href = "/tasks")
    })
    builder.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      state.profile = action.payload.user
    })
  },
})
export const { editName, editEmail, editPassword, toggleMode } =
  loginSlice.actions
export const selectName = (state: RootState) => state.login.name
export const selectAuthen = (state: RootState) => state.login.authen
export const selectIsLoginView = (state: RootState) => state.login.isLoginView
export const selectProfile = (state: RootState) => state.login.profile
