"use client";

import { useIsClient } from "@/lib/hooks";
import { type Review } from "@/lib/reviews";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  // use-debounce
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    // fetch search reviews
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();

      (async () => {
        const url = "/api/search?query=" + encodeURIComponent(debouncedQuery);
        try {
          const response = await fetch(url, { signal: controller.signal });

          if (!response.ok) {
            console.error("Failed to fetch search reviews");
            return;
          }
          const reviews: Review[] = await response.json();
          // console.log("reviews", reviews);
          setReviews(reviews);
        } catch (error) {
          console.log(error);
        }
      })();

      return () => controller.abort();
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);

  const router = useRouter();

  const isClient = useIsClient();
  if (!isClient) return null;

  const handleChange = (review: Review) => {
    // console.log("review", review);
    if (!review) return;
    router.push(`/reviews/${review.slug}`);
  };

  return (
    <div className='relative w-72'>
      <Combobox onChange={handleChange}>
        <ComboboxInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full border p-2 rounded'
          aria-label='Search'
          placeholder='Search:'
        />

        <ComboboxOptions anchor='bottom' className=' absolute border '>
          {reviews.map((review) => {
            return (
              <ComboboxOption key={review.slug} value={review}>
                {({ active }) => (
                  <span className={`block truncate w-full px-2 ${active ? "bg-gray-100" : ""}`}> {review.title}</span>
                )}
              </ComboboxOption>
            );
          })}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};
export default SearchBox;
