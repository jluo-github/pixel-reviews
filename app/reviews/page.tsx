import PaginationBar from "@/components/PaginationBar";
import SearchBox from "@/components/SearchBox";
import { getAllReviews } from "@/lib/reviews";
import Image from "next/image";
import Link from "next/link";

const PAGE_SIZE = 6;

const ReviewsPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const page: number = searchParams.page ? parsePageParam(searchParams.page) ?? 1 : 1;

  const { reviews, pageCount } = await getAllReviews(PAGE_SIZE, page);
  // console.log("reviews", reviews);
  if (!reviews) return null;
  console.log(reviews.map(({ slug, title }) => ({ slug, title })));

  return (
    <>
      <h2 className='my-4'>Reviews</h2>

      <div className='flex justify-between pb-3'>
        {" "}
        <PaginationBar href='/reviews' page={page} pageCount={pageCount} />
        <SearchBox />
      </div>

      <ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {reviews.map((review, index) => {
          const { slug, title, image } = review;
          return (
            <Link
              className='bg-white rounded hover:shadow-lg hover:shadow-violet-500  border-gray-500 border '
              key={slug}
              href={`/reviews/${slug}`}>
              <Image src={image} alt={title} width='640' height='360' priority={index === 0} />
              <h5 className='text-black py-2 text-center'> {title}</h5>
            </Link>
          );
        })}
      </ul>
    </>
  );
};
export default ReviewsPage;

function parsePageParam(paramValue: string) {
  if (paramValue) {
    const page = parseInt(paramValue);

    if (isFinite(page) && page > 0) {
      return page;
    }
  }
}
