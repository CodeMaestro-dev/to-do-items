"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoItem } from "@/lib/features/todoItems/crudTodoItems";
import StartToastifyInstance from "toastify-js";

export default function Home() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const showToastMessage = () => {
    StartToastifyInstance({
      text: "Todo added successfully",
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const todoItem = {
      id: Date.now(),
      title: todo,
      completed: false,
    };
    dispatch(addTodoItem(todoItem));
    setTodo("");
    showToastMessage();
  };

  return (
    <div className="flex justify-center mt-[50px]">
      <form className="flex flex-col gap-5 w-[600px]" onSubmit={handleSubmit}>
        <textarea
          name="to-do"
          id="to-do"
          className="bg-transparent border border-tertiary px-3 py-2 focus:border focus:border-secondary focus:outline-none"
          onInput={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button className="rounded-md bg-secondary text-tertiary px-3 py-2">
          Submit
        </button>
      </form>
    </div>
  );
}
