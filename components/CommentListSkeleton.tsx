import { getComments } from "@/lib/comments";
import { UserCircleIcon } from "@heroicons/react/20/solid";

const CommentListSkeleton = async () => {
  return (
    <ul className='border my-4 rounded-lg'>
      {Array.from({ length: 3 }).map((_, i) => (
        <li key={i} className='border-b p-2 last:border-none odd:bg-violet-100'>
          <div className='flex gap-2 mb-2'>
            <UserCircleIcon className='w-6 h-6' />
          </div>
          <p className=''> </p>
        </li>
      ))}
    </ul>
  );
};
export default CommentListSkeleton;
