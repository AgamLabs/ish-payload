import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const w = searchParams.get("w");
  const q = searchParams.get("q");

  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    // Fetch the image
    const imageResponse = await fetch(url);
    if (!imageResponse.ok) {
      return new NextResponse("Failed to fetch image", { status: 500 });
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);

    // Process with Sharp
    let image = sharp(buffer);

    if (w) {
      const width = parseInt(w);
      image = image.resize(width);
    }

    const quality = q ? parseInt(q) : 80;

    // Convert to WebP for better compression
    const optimizedBuffer = await image.webp({ quality }).toBuffer();

    return new NextResponse(optimizedBuffer, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image optimization error:", error);
    return new NextResponse("Image optimization failed", { status: 500 });
  }
}
