"use server";
import db from "@/lib/db";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createComment = async (prevState: any, formData: FormData) => {
  //! to do
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!formData.get("user")) {
    return { isError: true, message: "Please provide your name" };
  }

  const slug = formData.get("slug") as string;
  const user = formData.get("user") as string;
  const message = formData.get("message") as string;

  await db.comment.create({
    data: { slug, user, message },
  });

  revalidatePath(`/reviews/${slug}`);
  redirect(`/reviews/${slug}`);
};
