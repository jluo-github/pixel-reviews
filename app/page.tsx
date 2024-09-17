import { getAllReviews } from "@/lib/reviews";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { reviews } = await getAllReviews(2);

  if (!reviews) return null;

  return (
    <div className=''>
      <h1 className=''>Indie Gamer</h1>
      <p className=''>the best indie games, reviewed by you.</p>

      <div className=''>
        <ul className='flex flex-col gap-8'>
          {reviews.map((review, index) => {
            const { slug, title, image, subtitle } = review;
            return (
              <Link
                className='bg-white rounded hover:shadow-lg hover:shadow-violet-500  border-gray-500 border '
                key={slug}
                href={`/reviews/${slug}`}>
                <div className='relative w-full'>
                  <Image
                    src={image}
                    alt={title}
                    width='640'
                    height='360'
                    priority={index === 0}
                    className='w-full h-auto'
                  />
                </div>
                <h3 className='text-black py-2 text-center'> {title}</h3>
                <h4 className='text-gray-700 text-center'>{subtitle}</h4>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
