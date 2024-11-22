
const NoTaskErrorDisplay = () => {
 return (
  <div className="bg-white font-bold p-3 rounded-xl flex flex-col gap-6 justify-center items-center">
   <p className="text-red-500">Error fetching todos</p>
  </div>
 );
};

export default NoTaskErrorDisplay;
