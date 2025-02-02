"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="bg-dark-black text-tertiary fixed h-full col-start-1 col-end-3 hidden lg:block">
      <ul className="flex flex-col gap-10 py-12 px-[36px]">
        <li title="Add Todo" className={pathname == "/" ? " bg-secondary rounded-md" : ""}>
          <Link className="pl-0 min-[1790px]:pl-3 pe-0 min-[1790px]:pe-10 py-2 flex gap-3" href="/">
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
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="hidden min-[1790px]:block">Add Todo</span>
          </Link>
        </li>
        <li title="Todo" className={pathname == "/todo" ? "bg-secondary rounded-md" : ""}>
          <Link className="pl-0 min-[1790px]:pl-3 pe-0 min-[1790px]:pe-10 py-2 flex gap-3" href="/todo">
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
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
              />
            </svg>
            <span className="hidden min-[1790px]:block">To do</span>
          </Link>
        </li>
        <li title="Completed Todo" className={pathname == "/completed" ? "bg-secondary rounded-md" : ""}>
          <Link className="pl-0 min-[1790px]:pl-3 pe-0 min-[1790px]:pe-10 py-2 flex gap-3" href="/completed">
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
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="hidden min-[1790px]:block">Completed Todo</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
