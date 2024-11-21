import { FilePenLine, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { TTodo } from "@/types/todo";
import { useAppDispatch } from "@/redux/hook";
import { removeTodo, toggleTodo } from "@/redux/features/todoSlice";
import { toast } from "sonner";
import { cn } from "@/lib/utils";


const TodoCard = ({ todo }: { todo: TTodo }) => {
 const dispatch = useAppDispatch();
 const handleRemoveTodo = (id: string) => {
  dispatch(removeTodo(id));
  toast.success("Todo removed successfully.");
 }
 const handleTodoStatusChange = (id: string) => {
  dispatch(toggleTodo(id));
  toast.success("Todo status changed successfully.")
 }
 return (
  <div className="bg-white p-3 rounded-xl flex justify-between items-center">
   <Checkbox className="rounded-full data-[state=checked]:bg-green-500 border-green-500 size-5 mr-2" checked={todo.isCompleted} onCheckedChange={() => handleTodoStatusChange(todo.id)} />
   <p className="text-sm font-medium text-gray-500 flex-1">{todo.title}</p>
   <div className="capitalize flex items-center gap-2 flex-1">
    <div className={cn("p-2 rounded-full", todo.priority === "high" ? "bg-red-500" : todo.priority === "medium" ? "bg-yellow-500" : todo.priority === "low" ? "bg-green-500" : "bg-black")}></div>
    <p>{todo.priority}</p>
   </div>
   <p className={cn(todo.isCompleted ? "text-green-500" : "text-yellow-500", "flex-1")}>{todo.isCompleted ? "Complete" : "Pending"}</p>
   <p className="flex-1">{todo.description}</p>
   <div className="flex gap-2 ml-4">
    <Button variant="outline" size="icon" className="group hover:bg-blue-50"><FilePenLine className="group-hover:text-blue-500" /></Button>
    <Button variant="outline" size="icon" className="group hover:bg-red-50" onClick={() => handleRemoveTodo(todo.id)} ><Trash2 className="group-hover:text-red-500" /></Button>
   </div>
  </div>
 );
};

export default TodoCard;
