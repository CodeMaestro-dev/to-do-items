"use client";
import TodoItem from "../components/TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  completeUndoneItems,
  fetchUndoneItems,
  getTodoItems,
} from "@/lib/features/todoItems/todoItemSlice";
import {
  completeTodoItem,
  editTodoItem,
  getTodo,
} from "@/lib/features/todoItems/crudTodoItems";
import StartToastifyInstance from "toastify-js";

export default function Todo() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [editedValueId, setEditedValueId] = useState(0);
  const dispatch = useDispatch();
  const { status, error, undoneItems } = useSelector(getTodoItems);
  const { todoItems } = useSelector(getTodo);
  const undoneTodo = todoItems.filter((todo) => todo.completed == false);
  useEffect(() => {
    dispatch(fetchUndoneItems());
  }, [dispatch]);

  const completeItem = (e) => {
    const completeLiKey = e.target.closest("li").id;
    dispatch(completeTodoItem(completeLiKey));
    showSecondToastMessage();
  };

  const completeTodo = (e) => {
    const completeLiKey = e.target.closest("li").id;
    dispatch(completeUndoneItems(completeLiKey));
    showSecondToastMessage();
  };

  const handleEdit = (title) => {
    setModalOpen(true);
    setEditedValue(title);
  };

  const handelKey = (e) => {
    const editedLiKey = e.target.closest("li").id;
    setEditedValueId(editedLiKey);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(false);
    showToastMessage();
    dispatch(editTodoItem({ editedValueId, editedValue }));
  };

  const showToastMessage = () => {
    StartToastifyInstance({
      text: "Todo edited successfully",
      className: "fixed z-20 p-4 top-5 right-5 flex gap-3 text-tertiary",
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

  const showSecondToastMessage = () => {
    StartToastifyInstance({
      text: "Todo status changed to complete successfully",
      className: "fixed z-20 p-4 top-5 right-5 flex gap-3 text-tertiary",
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
    <div>
      <h1 className="text-2xl mb-10">To-dos</h1>
      {isModalOpen ? (
        <div className="fixed inset-0 backdrop-blur-sm w-screen h-screen z-50 flex items-center justify-center">
          <form
            className="flex flex-col gap-5 w-[600px] bg-white p-5 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <div
              className="border border-secondary cursor-pointer rounded-full p-2 w-fit text-primary"
              onClick={() => setModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <input
              name="to-do"
              id="to-do"
              className="bg-primary border border-tertiary px-3 py-2 focus:border focus:border-secondary focus:outline-none rounded-md"
              onInput={(e) => setEditedValue(e.target.value)}
              value={editedValue}
            />
            <button className="rounded-md bg-secondary text-tertiary px-3 py-2">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-4 min-[3000px]:grid-cols-8 grid-rows-[auto] gap-[30px]">
        {undoneTodo
          .slice()
          .reverse()
          .map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              todo={item.title}
              onClick={completeItem}
              handleEdit={(e) => {
                handleEdit(item.title);
                handelKey(e);
              }}
              button="Completed"
              secondButton="Edit"
            />
          ))}
        {undoneItems.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            todo={item.title}
            onClick={completeTodo}
            handleEdit={() => handleEdit(item.title)}
            button="Completed"
            secondButton="Edit"
          />
        ))}
      </ul>
    </div>
  );
}
