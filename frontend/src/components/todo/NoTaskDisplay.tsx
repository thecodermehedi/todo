import CreateTask from "../shared/createTask";

const NoTasksDisplay = () => {
 return (
  <div className="bg-white font-bold p-3 rounded-xl flex flex-col gap-6 justify-center items-center">
   <p>You have no tasks yet. Add a new task to get started!</p>
   <CreateTask />
  </div>
 );
};

export default NoTasksDisplay;
