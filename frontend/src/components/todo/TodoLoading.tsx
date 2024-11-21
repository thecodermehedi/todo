import { Skeleton } from "../ui/skeleton";


const TodoLoading = () => {
 return (
  <div className="bg-white p-3 rounded-xl flex justify-between items-center">
   <Skeleton className="h-5 w-5 rounded-full" />
   {/* <Skeleton className="h-4 w-16" /> */}
   <Skeleton className="h-4 w-12" />
   <Skeleton className="h-4 w-24" />
   <div className="flex gap-2">
    <Skeleton className="h-8 w-8" />
    <Skeleton className="h-8 w-8" />
   </div>
  </div>
 );
};

export default TodoLoading;
