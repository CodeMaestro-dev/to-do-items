import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCompletedItems = createAsyncThunk(
  "todoItem/completed",
  async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos`
    );
    const items = response.data;
    const completedItems = items.filter((item) => item.completed == true);
    return completedItems;
  }
);

export const fetchUndoneItems = createAsyncThunk(
  "todoItem/undone",
  async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos`
    );
    const items = response.data;
    const undoneItems = items.filter((item) => item.completed == false);
    return undoneItems;
  }
);

export const deleteCompletedTodo = createAsyncThunk(
  "todoItem/delete",
  async (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
);

export const completeUndoneItems = createAsyncThunk(
  "todoItem/complete",
  async (id) => {
    axios
      .patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: true,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
  }
);

const todoItemSlice = createSlice({
  name: "todoItems",
  initialState: {
    completedItems: [],
    undoneItems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompletedItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.completedItems = action.payload;
      })
      .addCase(fetchCompletedItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUndoneItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUndoneItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.undoneItems = action.payload;
      })
      .addCase(fetchUndoneItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(completeUndoneItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(completeUndoneItems.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(completeUndoneItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCompletedTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCompletedTodo.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteCompletedTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getTodoItems = (state) => state.todoItems;
export default todoItemSlice.reducer;
