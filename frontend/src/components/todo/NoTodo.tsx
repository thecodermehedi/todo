import AddTodo from "./AddTodo";

const NoTodo = () => {
 return (
  <div className="bg-white font-bold p-3 rounded-xl flex flex-col gap-6 justify-center items-center">
   <p>You have no tasks yet. Add a new task to get started!</p>
   <AddTodo />
  </div>
 );
};

export default NoTodo;
