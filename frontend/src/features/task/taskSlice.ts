import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { type RootState } from "../../app/store"

const apiUrl = "http://localhost:8000/api/todo"
const token = localStorage.localJWT

export type taskType = {
  id: number
  title: string
  content: string
}

export const fetchAsyncGet = createAsyncThunk("task/get", async () => {
  const res = await axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
})

export const fetchAsyncCreate = createAsyncThunk("task/post", async task => {
  const res = await axios.post(apiUrl, task, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
})

export const fetchAsyncUpdate = createAsyncThunk<
  taskType, // 成功時に返ってくるデータの型
  taskType // 引数として受け取る task の型
>("task/put", async task => {
  const res = await axios.patch(`${apiUrl}${task.id}/`, task, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
})

export const fetchAsyncDelete = createAsyncThunk("task/delete", async id => {
  await axios.delete(`${apiUrl}${id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  return id
})

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [
      {
        id: 0,
        title: "",
        content: "",
      },
    ],
    editedTask: {
      id: 0,
      title: "",
      content: "",
    },
    selectedTask: {
      id: 0,
      title: "",
      content: "",
    },
  },
  reducers: {
    editTask(state, action) {
      state.editedTask = action.payload
    },
    selectTask(state, action) {
      state.selectedTask = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      }
    })
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }
    })
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id ? action.payload : t,
        ),
        selectedTask: action.payload,
      }
    })
    builder.addCase(fetchAsyncDelete.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== Number(action.payload)),
        selectedTask: { id: 0, title: "", content: "" },
      }
    })
  },
})
export const { editTask, selectTask } = taskSlice.actions

export const selectSelectedTask = (state: RootState) => state.task.selectedTask
export const selectEditedTask = (state: RootState) => state.task.editedTask
export const selectTasks = (state: RootState) => state.task.tasks
