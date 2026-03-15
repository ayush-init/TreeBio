import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    // Add timeout and user agent to avoid blocking
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      // Return a graceful fallback instead of throwing error
      return NextResponse.json({
        title: new URL(url).hostname,
        description: 'No description available',
        image: null,
        url: url,
      });
    }

    const html = await response.text();
    
    // Extract OG data (your existing logic)
    const titleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    const descriptionMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    const imageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);

    const title = titleMatch?.[1] || new URL(url).hostname;
    const description = descriptionMatch?.[1] || 'No description available';
    const image = imageMatch?.[1] || null;

    return NextResponse.json({
      title,
      description,
      image,
      url,
    });

  } catch (error) {
    // Return fallback data instead of error
    return NextResponse.json({
      title: new URL(url).hostname,
      description: 'No description available',
      image: null,
      url: url,
    });
  }
}