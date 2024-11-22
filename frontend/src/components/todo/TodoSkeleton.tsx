import { Skeleton } from "../ui/skeleton";


const TodoSkeleton = () => {
 return (
  <div className="bg-white p-3 rounded-xl flex justify-between items-center">
   <Skeleton className="rounded-full h-5 w-5 mr-2" />
   <Skeleton className="h-4 w-24 flex-1 mr-28" />
   <div className="capitalize flex items-center gap-2 flex-1">
    <Skeleton className="h-4 w-4 rounded-full" />
    <Skeleton className="h-4 w-12" />
   </div>
   <Skeleton className="h-4 w-16 flex-1 mr-8" />
   <Skeleton className="h-4 w-32 flex-1" />
   <div className="flex gap-2 ml-4">
    <Skeleton className="h-8 w-8 rounded-md" />
    <Skeleton className="h-8 w-8 rounded-md" />
   </div>
  </div>
 );
};

export default TodoSkeleton;
