import { TTodo } from "@/types/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { todos: [] as TTodo[] }

const todoSlice = createSlice({
 name: "todos",
 initialState,
 reducers: {
  addTodo: (state, action: PayloadAction<TTodo>) => {
   state.todos.push({ ...action.payload, isCompleted: false })
  },
  removeTodo: (state, action: PayloadAction<string>) => {
   state.todos = state.todos.filter((todo) => todo.id !== action.payload)
  },
  toggleTodo: (state, action: PayloadAction<string>) => {
   const task = state.todos.find((todo) => todo.id === action.payload)
   task!.isCompleted = !task!.isCompleted
   const filteredTodos = state.todos.filter((todo) => todo.id !== action.payload)
   state.todos = [...filteredTodos, task!]
  }
 }
})

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions

export default todoSlice.reducer
