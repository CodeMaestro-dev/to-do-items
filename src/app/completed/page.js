"use client";
import TodoItem from "../components/TodoItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompletedTodo,
  fetchCompletedItems,
  getTodoItems,
} from "@/lib/features/todoItems/todoItemSlice";
import { useEffect, useState } from "react";
import {
  deleteTodoItem,
  getTodo,
} from "@/lib/features/todoItems/crudTodoItems";
import StartToastifyInstance from "toastify-js";

export default function Completed() {
  const dispatch = useDispatch();
  const { completedItems, status, error } = useSelector(getTodoItems);
  const { todoItems } = useSelector(getTodo);
  const completedTodo = todoItems.filter((todo) => todo.completed == true);

  useEffect(() => {
    dispatch(fetchCompletedItems());
  }, [dispatch]);

  const handleDeletedTodo = (id) => {
  };

  const deleteTodo = (e) => {
    const deleteLiKey = e.target.closest("li").id;
    dispatch(deleteTodoItem(deleteLiKey));
    handleDeletedTodo(deleteLiKey);
    showToastMessage();
  };

  const deleteItem = (e) => {
    const deleteLiKey = e.target.closest("li").id;
    dispatch(deleteCompletedTodo(deleteLiKey));
    showToastMessage();
  };

  const showToastMessage = () => {
    StartToastifyInstance({
      text: "Todo deleted successfully",
      className: "absolute z-20 p-4 top-5 right-5 flex gap-3 text-tertiary",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top",
      position: "left",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #8A2BE2,  #8A2BA2)",
      },
    }).showToast();
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <main>
      <h1 className="text-2xl mb-5">Completed</h1>
      <p className="text-md mb-10 font-bold">
        Note: Items in the completed tab will delete after 60 days of completion
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-4 min-[3000px]:grid-cols-8 grid-rows-[auto] gap-[30px]">
        {completedTodo
          .slice()
          .reverse()
          .map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              todo={item.title}
              button="Delete"
              onClick={deleteTodo}
            />
          ))}
        {completedItems
          .map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              todo={item.title}
              button="Delete"
              onClick={deleteItem}
            />
          ))}
      </ul>
    </main>
  );
}
