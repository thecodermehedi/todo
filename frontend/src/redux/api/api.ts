import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
 reducerPath: 'baseApi',
 baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
 tagTypes: ["tasks"],
 endpoints: (builder) => ({
  getTodos: builder.query({
   query: (priority) => {
    const params = new URLSearchParams()
    if (priority) {
     params.append('priority', priority)
    }
    return { url: "/tasks", method: "GET", params }
   },
   providesTags: ["tasks"]
  }),
  addTodo: builder.mutation({
   query: (data) => ({ url: "/tasks", method: "POST", body: data }),
   invalidatesTags: ["tasks"]
  }),
  updateTodo: builder.mutation({
   query: (options) => ({ url: `/task/${options.id}`, method: "PUT", body: options.data }),
   invalidatesTags: ["tasks"]
  }),
  removeTodo: builder.mutation({
   query: (id) => ({ url: `/task/${id}`, method: "DELETE" }),
   invalidatesTags: ["tasks"]
  })
 }),
})

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useRemoveTodoMutation } = baseApi
