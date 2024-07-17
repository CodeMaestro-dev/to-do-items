import { createSlice } from "@reduxjs/toolkit";

const crudTodoSlice = createSlice({
  name: "crudTodo",
  initialState: {
    todoItems: [],
  },
  reducers: {
    initializeTodos: (state) => {
      const savedTodos = JSON.parse(localStorage.getItem("todoItems")) || [];
      state.todoItems = savedTodos;
    },
    addTodoItem: (state, action) => {
      state.todoItems.push(action.payload);
      localStorage.setItem("todoItems", JSON.stringify(state.todoItems));
    },
    completeTodoItem: (state, action) => {
      const completeIdea = state.todoItems.filter(
        (todo) => todo.id == action.payload
      );
      if (completeIdea) {
        completeIdea[0].completed = true;
        localStorage.setItem("todoItems", JSON.stringify(state.todoItems));
      }
    },
    deleteTodoItem: (state, action) => {
      const updatedTodo = state.todoItems.filter(
        (todo) => todo.id != action.payload
      );
      if (updatedTodo) {
        state.todoItems = updatedTodo;
        localStorage.setItem("todoItems", JSON.stringify(state.todoItems));
      }
    },
    editTodoItem: (state, action) => {
      const editItem = state.todoItems.findIndex(
        (x) => x.id == action.payload.editedValueId
      );
      state.todoItems[editItem] = {
        id: Date.now(),
        title: action.payload.editedValue,
        completed: false,
      };

      localStorage.setItem("todoItems", JSON.stringify(state.todoItems));
    },
  },
});

export const getTodo = (state) => state.crudTodo;
export const { addTodoItem, deleteTodoItem, completeTodoItem, editTodoItem, initializeTodos } =
  crudTodoSlice.actions;
export default crudTodoSlice.reducer;
