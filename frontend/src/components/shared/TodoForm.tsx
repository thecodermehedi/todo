import * as React from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAddTodoMutation, useUpdateTodoMutation } from "@/redux/api/api"
import { TTodo } from "@/types/todo"

interface TodoFormProps {
 className?: string
 onClose: () => void
 initialData?: TTodo
}

export const TodoForm: React.FC<TodoFormProps> = ({ className, onClose, initialData }) => {
 const [addTodo] = useAddTodoMutation()
 const [updateTodo] = useUpdateTodoMutation()

 const [title, setTitle] = React.useState(initialData?.title || "")
 const [priority, setPriority] = React.useState(initialData?.priority || "")
 const [description, setDescription] = React.useState(initialData?.description || "")

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  if (!title) return toast.error("Task is required")
  if (!priority) return toast.error("Priority is required")
  if (priority !== "low" && priority !== "medium" && priority !== "high") return toast.error("Invalid priority")
  if (!description) return toast.error("Description is required")

  const todoData = { title, priority, description }

  let response
  if (initialData?._id) {
   response = await updateTodo({ id: initialData._id, data: todoData })
  } else {
   response = await addTodo(todoData)
  }

  if ('data' in response) {
   onClose()
   toast.success(initialData?._id ? "Task updated successfully" : "Task added successfully")
  } else {
   toast.error(initialData?._id ? "Failed to update task" : "Failed to add task")
  }
 }

 return (
  <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
   <div className="grid gap-2">
    <Input
     type="text"
     id="title"
     value={title}
     onChange={(e) => setTitle(e.target.value)}
     className="focus-visible:ring-0 bg-gray-100 focus-visible:bg-white"
     placeholder="Title"
     required
    />
   </div>
   <div className="grid gap-2">
    <Select value={priority} onValueChange={(value) => setPriority(value)}>
     <SelectTrigger className="w-full focus:ring-0 border-none shadow-none bg-gray-100 border text-gray-500">
      <SelectValue placeholder="Priority" />
     </SelectTrigger>
     <SelectContent>
      <SelectItem value="low" className="cursor-pointer">Low</SelectItem>
      <SelectItem value="medium" className="cursor-pointer">Medium</SelectItem>
      <SelectItem value="high" className="cursor-pointer">High</SelectItem>
     </SelectContent>
    </Select>
   </div>
   <div className="grid gap-2">
    <textarea
     id="description"
     value={description}
     onChange={(e) => setDescription(e.target.value)}
     className="focus-visible:ring-0 bg-gray-100 focus-visible:bg-white resize-none focus:outline-none rounded-lg border p-2 text-sm"
     rows={7}
     placeholder="Description"
     required
    />
   </div>
   <Button type="submit">{initialData?._id ? "Save" : "Create"}</Button>
  </form>
 )
}

