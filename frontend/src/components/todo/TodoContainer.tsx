import AddTodo from "./AddTodo";
import FilterTodo from "./FilterTodo";
import TodoCard from "./TodoCard";
import NoTodo from "./NoTodo";
import TodoLoading from "./TodoLoading";
import { useGetTodosQuery } from "@/redux/api/api";
import { TTodo } from "@/types/todo";

const TodoContainer = () => {
 const { data: TodoResponse, isLoading, isError } = useGetTodosQuery(undefined);
 const todos = TodoResponse?.data;

 return (
  <div className="p-5">
   <div className="flex justify-between items-center">
    <AddTodo />
    <FilterTodo />
   </div>
   <div className="mt-4 rounded-xl bg-primary-gradient w-full h-full p-[5px] overflow-x-hidden overflow-y-auto space-y-3">
    {isLoading ? (
     <TodoLoading />
    ) : isError ? (
      <div className="text-red-500">Error fetching todos</div>
    ) : todos && todos.length > 0 ? (
     todos.map((todo: TTodo) => <TodoCard key={todo.id} todo={todo} />)
    ) : (
     <NoTodo />
    )}
   </div>
  </div>
 );
};

export default TodoContainer;
