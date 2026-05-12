import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { SANITY_CACHE_TAGS } from "@/sanity/fetch";

const TYPE_TO_TAG: Record<string, string> = {
  photo: SANITY_CACHE_TAGS.photos,
  siteSettings: SANITY_CACHE_TAGS.settings,
};

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(req: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { message: "Revalidation secret not configured" },
      { status: 500 }
    );
  }

  const provided =
    req.headers.get("x-sanity-secret") ??
    req.nextUrl.searchParams.get("secret") ??
    "";

  if (!safeEqual(provided, expected)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string } = {};
  try {
    body = await req.json();
  } catch {
    // Empty or invalid body — revalidate everything below.
  }

  try {
    const tag = body._type ? TYPE_TO_TAG[body._type] : undefined;
    if (tag) {
      revalidateTag(tag, "max");
      return NextResponse.json({ revalidated: true, tag, now: Date.now() });
    }

    for (const t of Object.values(SANITY_CACHE_TAGS)) revalidateTag(t, "max");
    return NextResponse.json({ revalidated: true, tag: "all", now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 }
    );
  }
}
