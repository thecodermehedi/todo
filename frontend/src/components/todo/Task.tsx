import { FilePenLine, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { TTodo } from "@/types/todo";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRemoveTodoMutation, useUpdateTodoMutation } from "@/redux/api/api";
import EditTask from "../shared/EditTask";


const Task = ({ todo }: { todo: TTodo }) => {
 const [updateTodo] = useUpdateTodoMutation();
 const [removeTodo] = useRemoveTodoMutation();

 const handleRemoveTodo = async () => {
  try {
   const response = await removeTodo(todo._id).unwrap();
   toast.success(response.message);
  } catch (error: any) {
   toast.error(error?.data?.message || 'Failed to remove todo');
  }
 };

 const handleTodoStatusChange = async (checked: boolean) => {
  try {
   const response = await updateTodo({
    id: todo._id,
    data: { isCompleted: checked }
   }).unwrap();
   toast.success(response.message);
  } catch (error: any) {
   toast.error(error?.data?.message || 'Failed to update todo');
  }
 };
 return (
  <div className="bg-white p-3 rounded-xl flex justify-between items-center">
   <Checkbox className="rounded-full data-[state=checked]:bg-green-500 border-green-500 size-5 mr-2" defaultChecked={todo.isCompleted} onCheckedChange={handleTodoStatusChange} />
   <p className="text-sm font-medium text-gray-500 flex-1">{todo.title}</p>
   <div className="capitalize flex items-center gap-2 flex-1">
    <div className={cn("p-2 rounded-full", todo.priority === "high" ? "bg-red-500" : todo.priority === "medium" ? "bg-yellow-500" : todo.priority === "low" ? "bg-green-500" : "bg-black")}></div>
    <p>{todo.priority}</p>
   </div>
   <p className={cn(todo.isCompleted ? "text-green-500" : "text-yellow-500", "flex-1")}>{todo.isCompleted ? "Complete" : "Pending"}</p>
   <p className="flex-1">{todo.description}</p>
   <div className="flex gap-2 ml-4">
    <EditTask todo={todo} />
    <Button variant="outline" size="icon" className="group hover:bg-red-50" onClick={handleRemoveTodo} ><Trash2 className="group-hover:text-red-500" /></Button>
   </div>
  </div>
 );
};

export default Task;
