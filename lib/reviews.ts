import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

export async function getReview(slug: string) {
  const text = await readFile(`./content/reviews/${slug}.md`, "utf-8");
  const {
    content,
    data: { title, date, image },
  } = matter(text);

  const html = marked(content, { headerIds: false, mangle: false });
  return { title, date, image, html };
}

export async function getAllReviews() {
  const files = await readdir("./content/reviews");
  
  const slugs = files.filter((file) => file.endsWith(".md")).map((file) => file.slice(0, -".md".length));

  const reviews = [];
  for (const slug of slugs) {
    const review = await getReview(slug);
    reviews.push(review);
  }
  return reviews;
}
