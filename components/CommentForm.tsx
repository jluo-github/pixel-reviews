"use client";
import { createComment } from "@/app/reviews/[slug]/actions";
import { useFormState, useFormStatus } from "react-dom";

const CommentForm = ({ slug }: { slug: string }) => {
  const [formState, formAction] = useFormState(createComment, null);

  return (
    <form action={formAction} className='border bg-white flex flex-col gap-2 my-12 p-2 rounded shadow-xl'>
      <div className='flex items-center'>
        <input type='hidden' value={slug} name='slug' />
        <label htmlFor='userField' className='shrink-0 w-32'>
          Your name
        </label>
        <input type='text' name='user' id='userField' className='border p-2 rounded w-full m-1' />
      </div>

      <div className='flex '>
        <label htmlFor='messageField' className='shrink-0 w-32'>
          Your comment
        </label>
        <textarea id='messageField' name='message' className='border p-2 rounded w-full m-1' />
      </div>

      <div className='flex items-center flex-col mt-4'>
        {formState?.isError && <p className='text-red-500'>{formState.message}</p>}
        <SubmitBtn />
      </div>
    </form>
  );
};

export default CommentForm;

function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type='submit'
      className='border border-violet-500 w-48 rounded-lg shadow-xl hover:shadow-violet-500 bg-violet-400 text-white py-1 px-2 hover:bg-violet-500 disabled:bg-slate-300 disabled:cursor-not-allowed'>
      {pending ? "Submitting" : "Submit"}
    </button>
  );
}
