"use server";
import db from "@/lib/db";
import type { Comment } from "@prisma/client";

export async function getComments(slug: string) {
  // todo: remove this delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const comments: Comment[] = await db.comment.findMany({
    where: {
      slug,
    },
    orderBy: { postedAt: "desc" },
  });

  return comments;
}
