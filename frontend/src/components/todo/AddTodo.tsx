import * as React from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAddTodoMutation } from "@/redux/api/api"

const AddTodo = () => {
 const isDesktop = useMediaQuery("(min-width: 768px)")
 const [open, setOpen] = React.useState(false)

 const handleClose = () => setOpen(false);

 if (isDesktop) {
  return (
   <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
     <Button className="bg-primary-gradient text-white"> <PlusIcon /> Task</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
     <DialogHeader>
      <DialogTitle>Add Task</DialogTitle>
      <DialogDescription>
       Add your task here. Click save when you're done.
      </DialogDescription>
     </DialogHeader>
     <TodoForm onClose={handleClose} />
    </DialogContent>
   </Dialog>
  )
 }

 return (
  <Drawer open={open} onOpenChange={setOpen}>
   <DrawerTrigger asChild>
    <Button className="bg-primary-gradient text-white"> <PlusIcon /></Button>
   </DrawerTrigger>
   <DrawerContent>
    <DrawerHeader className="text-left">
     <DrawerTitle>Add Task</DrawerTitle>
     <DrawerDescription>
      Add your task here. Click save when you're done.
     </DrawerDescription>
    </DrawerHeader>
    <TodoForm className="px-4" onClose={handleClose} />
    <DrawerFooter className="pt-2">
     <DrawerClose asChild>
      <Button variant="outline">Cancel</Button>
     </DrawerClose>
    </DrawerFooter>
   </DrawerContent>
  </Drawer>
 )
}

type TodoFormProps = {
 className?: string,
 onClose: () => void
}

const TodoForm = ({ className, onClose }: TodoFormProps) => {
 const [addTodo] = useAddTodoMutation()

 const [title, setTitle] = React.useState("")
 const [priority, setPriority] = React.useState("")
 const [description, setDescription] = React.useState("")

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  if (!title) return toast.error("Task is required");
  if (!priority) return toast.error("Priority is required");
  if (priority !== "low" && priority !== "medium" && priority !== "high") return toast.error("Invalid priority");
  if (!description) return toast.error("Description is required");

  const NewTask = { title, priority, description };

  const response = await addTodo(NewTask)
  if ('data' in response) {
   onClose();
   toast.success("Task added successfully");
  } else {
   toast.error("Failed to add task");
  }
 }
 return (
  <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
   <div className="grid gap-2">
    <Input type="text" id="title" onChange={(e) => setTitle(e.target.value)} className="focus-visible:ring-0 bg-gray-100 focus-visible:bg-white" placeholder="Title" required />
   </div>
   <div className="grid gap-2">
    <Select onValueChange={(value) => setPriority(value)}>
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
    <textarea id="description" onChange={(e) => setDescription(e.target.value)} className="focus-visible:ring-0 bg-gray-100 focus-visible:bg-white resize-none focus:outline-none rounded-lg border p-2 text-sm" rows={7} placeholder="Description" required />
   </div>
   <Button type="submit">Save changes</Button>
  </form>
 )
}

export default AddTodo
