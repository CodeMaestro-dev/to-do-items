export default function TodoItem({
  todo,
  button,
  onClick,
  id,
  secondButton,
  handleEdit,
}) {
  return (
    <li
      id={id}
      className="bg-dark-black rounded-md px-5 py-4 text-left w-full h-auto flex flex-col gap-3 justify-between"
    >
      {todo}
      <div className="flex gap-3 w-full flex-col min-[1790px]:flex-row">
        <button
          className="rounded-md bg-secondary text-tertiary px-3 py-2 flex-1"
          onClick={onClick}
        >
          {button}
        </button>
        {secondButton ? (
          <button
            className="rounded-md bg-secondary text-tertiary px-3 py-2 flex-1"
            onClick={handleEdit}
          >
            {secondButton}
          </button>
        ) : (
          <></>
        )}
      </div>
    </li>
  );
}
