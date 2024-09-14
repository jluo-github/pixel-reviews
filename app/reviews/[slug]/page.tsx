import { getReview } from "@/lib/reviews";
import Image from "next/image";

const SingleReview = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { title, date, image, html } = await getReview(slug);

  return (
    <>
      <h1 className=''>{title}</h1>
      <p className='text-sm text-gray-500'>Published on {date}</p>
      <Image src={image} alt={slug} width='640' height='360' className='rounded my-2' />
      <article dangerouslySetInnerHTML={{ __html: html }} className='text-lg prose max-w-screen-sm'></article>
    </>
  );
};
export default SingleReview;
