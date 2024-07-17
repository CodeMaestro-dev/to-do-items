import { configureStore } from "@reduxjs/toolkit";
import todoItemSlice from "./features/todoItems/todoItemSlice";
import crudTodoItems from "./features/todoItems/crudTodoItems";

export const store = configureStore({
    reducer: {
        todoItems: todoItemSlice,
        crudTodo: crudTodoItems,
    }
})
