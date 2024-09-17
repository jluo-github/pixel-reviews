import { getComments } from "@/lib/comments";
import { UserCircleIcon } from "@heroicons/react/20/solid";

const CommentList = async ({ slug }: { slug: string }) => {
  const comments = await getComments(slug);
  if (comments.length === 0) return <p>No comments yet.</p>;

  return (
    <ul className='border my-4 rounded-lg'>
      {comments.map((comment) => (
        <li key={comment.id} className='border-b p-2 last:border-none odd:bg-violet-100'>
          <div className='flex gap-2 mb-2'>
            <UserCircleIcon className='w-6 h-6' /> {comment.user}
          </div>
          <p className=''>{comment.message}</p>
        </li>
      ))}
    </ul>
  );
};
export default CommentList;
