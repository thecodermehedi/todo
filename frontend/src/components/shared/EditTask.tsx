import * as React from "react"
import { EditIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ResponsiveDialogDrawer } from "@/components/shared/ResponsiveDialogDrawer"
import { TodoForm } from "@/components/shared/TodoForm"
import { TTodo } from "@/types/todo"

const EditTask = ({ todo }: { todo: TTodo }) => {
 const [open, setOpen] = React.useState(false)

 const handleClose = () => setOpen(false)

 return (
  <ResponsiveDialogDrawer
   trigger={
    <Button variant="outline" size="icon" className="group hover:bg-blue-50"><EditIcon className="group-hover:text-blue-500" /></Button>
   }
   title="Edit Task"
   description="Edit your task here. Click save when you're done."
   open={open}
   onOpenChange={setOpen}
  >
   <TodoForm onClose={handleClose} initialData={todo} />
  </ResponsiveDialogDrawer>
 )
}

export default EditTask

