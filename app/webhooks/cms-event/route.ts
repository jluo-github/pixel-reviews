import { CACHE_TAG_REVIEWS } from "@/lib/reviews";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  
  if (payload.model === "review") {
    revalidateTag(CACHE_TAG_REVIEWS);
  }

  console.log("payload", payload);
  return new NextResponse(null, { status: 204 });
}
