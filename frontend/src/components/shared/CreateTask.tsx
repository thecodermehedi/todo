import * as React from "react"
import { PlusIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ResponsiveDialogDrawer } from "@/components/shared/ResponsiveDialogDrawer"
import { TodoForm } from "@/components/shared/TodoForm"

const CreateTask = () => {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => setOpen(false)

  return (
    <ResponsiveDialogDrawer
      trigger={
        <Button className="bg-primary-gradient text-white">
          <PlusIcon /> Task
        </Button>
      }
      title="Add Task"
      description="Add your task here. Click create when you're done."
      open={open}
      onOpenChange={setOpen}
    >
      <TodoForm onClose={handleClose} />
    </ResponsiveDialogDrawer>
  )
}

export default CreateTask

