import PriorityDropdown from "./PriorityDropdown";
import Task from "./Task";
import NoTasksDisplay from "./NoTaskDisplay";
import TodoSkeleton from "./TodoSkeleton";
import { useGetTodosQuery } from "@/redux/api/api";
import { TTodo } from "@/types/todo";
import { useState } from "react";
import CreateTask from "../shared/createTask";
import NoTaskErrorDisplay from "./NoTaskErrorDisplay";

const TodoContainer = () => {
 const [priority, setPriority] = useState<string>("");
 const { data: TodoResponse, isLoading, isError } = useGetTodosQuery(priority);
 const todos = TodoResponse?.data;

 return (
  <div className="p-5">
   <div className="flex justify-between items-center">
    <CreateTask />
    <PriorityDropdown priority={priority} setPriority={setPriority} />
   </div>
   <div className="mt-4 rounded-xl bg-primary-gradient w-full h-full p-[5px] overflow-x-hidden overflow-y-auto space-y-3">
    {isLoading ? Array(7).fill(0).map((_, index) => <TodoSkeleton key={index} />) :
     isError ? <NoTaskErrorDisplay /> :
      todos && todos.length > 0 ? (
       todos.map((todo: TTodo, idx: number) => <Task key={idx} todo={todo} />)
      ) : (
       <NoTasksDisplay />
      )}
   </div>
  </div>
 );
};

export default TodoContainer;
