import { getSearchReviews, type Review } from "@/lib/reviews";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") as string;
  console.log("search:: ", query);

  const reviews: Review[] = await getSearchReviews(query);

  return NextResponse.json(reviews);
}
