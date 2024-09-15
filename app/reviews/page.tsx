import { getAllReviews } from "@/lib/reviews";
import Image from "next/image";
import Link from "next/link";

const ReviewsPage = async () => {
  const reviews = await getAllReviews();

  return (
    <>
      <h2 className='my-4'>Reviews</h2>

      <ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {reviews.map((review) => {
          const { slug, title, image } = review;
          return (
            <Link
              className='bg-white rounded hover:shadow-lg hover:shadow-violet-500  border-gray-500 border '
              key={slug}
              href={`/reviews/${slug}`}>
              <Image src={image} alt={title} width='640' height='360' />
              <h5 className='text-black py-2 text-center'> {title}</h5>
            </Link>
          );
        })}
      </ul>
    </>
  );
};
export default ReviewsPage;
