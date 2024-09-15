import ShareLinkBtn from "@/components/ShareLinkBtn";
import { getReview, getSlugs } from "@/lib/reviews";
import Image from "next/image";

// generate Static Params for each review
export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

// generate Metadata for each review
export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const review = await getReview(slug);
  return {
    title: review.title,
  };
}

const SingleReview = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { title, date, image, body } = await getReview(slug);

  return (
    <>
      <h1 className=''>{title}</h1>

      <div className='flex items-baseline gap-2'>
        <p className='text-sm text-gray-500'> ⚠ Published on {date}</p>

        <ShareLinkBtn />
      </div>

      <Image src={image} alt={slug} width='640' height='360' className='rounded my-2' />
      <article dangerouslySetInnerHTML={{ __html: body }} className='text-lg prose max-w-screen-sm'></article>
    </>
  );
};
export default SingleReview;
