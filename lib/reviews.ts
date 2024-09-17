// import { readdir, readFile } from "node:fs/promises";
// import matter from "gray-matter";
// import image from "next/image";
// import { title } from "node:process";

import { marked } from "marked";
import qs from "qs";
const CMS_URL = process.env.CMS_URL;
export const CACHE_TAG_REVIEWS = "reviews";

interface CmsItem {
  id: number;
  attributes: any;
}
export interface Review {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
}
export interface FullReview extends Review {
  body: string;
}
export interface PaginatedReviews {
  pageCount: number;
  reviews: Review[];
}
export type SearchableReview = Pick<Review, "slug" | "title">;

// fetch review
export async function getReview(slug: string): Promise<FullReview | null> {
  const { data } = await await fetchAllReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
  if (data.length === 0) {
    return null;
  }

  const item = data[0];

  return {
    ...toReview(item),
    body: await marked(item.attributes.body),
  };
}

// fetch all reviews for search
export async function getSearchReviews(query: string) {
  const { data } = await fetchAllReviews({
    filters: { title: { $containsi: query } },
    fields: ["slug", "title"],
    sort: ["title"],
    pagination: { pageSize: 5 },
  });

  return data.map(({ attributes }: CmsItem) => ({ slug: attributes.slug, title: attributes.title }));
}

// fetch all reviews with pagination
export async function getAllReviews(pageSize: number, page?: number) {
  const { data, meta } = await fetchAllReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize, page },
  });

  return { pageCount: meta.pagination.pageCount as number, reviews: data.map(toReview) as Review[] };
}
// fetch slugs
export async function getSlugs(): Promise<string[]> {
  const { data } = await fetchAllReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });

  return data.map((item: CmsItem) => item.attributes.slug);
}

// helper function
async function fetchAllReviews(parameters: any) {
  const url = `${CMS_URL}/api/reviews?` + qs.stringify(parameters, { encodeValuesOnly: true });

  const response = await fetch(url, {
    next: {
      tags: [CACHE_TAG_REVIEWS],
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

// helper function
const toReview = (item: CmsItem): Review => {
  const { attributes } = item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "YYYY-MM-DD".length),
    image: CMS_URL + attributes.image.data.attributes.url,
  };
};

// export async function getReview(slug: string) {
//   const text = await readFile(`./content/reviews/${slug}.md`, "utf-8");
//   const {
//     content,
//     data: { title, date, image },
//   } = matter(text);
//   // , { headerIds: false, mangle: false }
//   const body = marked(content);
//   return { slug, title, date, image, body };
// }

// export async function getAllReviews() {
//   const files = await readdir("./content/reviews");

//   const slugs = files.filter((file) => file.endsWith(".md")).map((file) => file.slice(0, -".md".length));

//   const reviews = [];
//   for (const slug of slugs) {
//     const review = await getReview(slug);
//     reviews.push(review);
//   }
//   // sort by date
//   reviews.sort((a, b) => b.date.localeCompare(a.date));
//   return reviews;
// }

// export async function getSlugs() {
//   const files = await readdir("./content/reviews");
//   const slugs = files.filter((file) => file.endsWith(".md")).map((file) => file.slice(0, -".md".length));

//   return slugs;
// }

// export async function getFeaturedReview() {
//   const reviews = await getAllReviews();
//   return reviews[0];
// }
