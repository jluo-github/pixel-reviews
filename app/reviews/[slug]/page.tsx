import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import CommentListSkeleton from "@/components/CommentListSkeleton";
import ShareLinkBtn from "@/components/ShareLinkBtn";
import { getReview, getSlugs, type FullReview } from "@/lib/reviews";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Suspense } from "react";

// generate Static Params for each review
export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

// generate Metadata for each review
export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const review = await getReview(slug);

  if (!review) {
    throw new Error(`Review not found for slug: ${slug}`);
  }
  return {
    title: review.title,
  };
}

const SingleReview = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { title, date, image, body } = (await getReview(slug)) as FullReview;

  return (
    <>
      <h1 className=''>{title}</h1>

      <div className='flex items-baseline gap-2'>
        <p className='text-sm text-gray-500'> ⚠ Published on {date}</p>

        <ShareLinkBtn />
      </div>

      <Image src={image} alt={slug} width='640' height='360' className='rounded my-2' priority />
      <article dangerouslySetInnerHTML={{ __html: body }} className='text-lg prose max-w-screen-sm'></article>

      {/* comments */}
      <section className='border-dashed border-t max-w-screen-sm my-20'>
        <h2 className='flex gap-2 items-center '>
          {" "}
          <ChatBubbleBottomCenterTextIcon className='h-6 w-6' /> Comments
        </h2>

        {/* comment form */}
        <CommentForm slug={slug} />
        {/* comment list */}
        <Suspense fallback={<CommentListSkeleton />}>
          <CommentList slug={slug} />
        </Suspense>
      </section>
    </>
  );
};
export default SingleReview;
