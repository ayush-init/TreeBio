import { NextRequest, NextResponse } from 'next/server';
import { getAllLinkForUser } from '@/modules/links/actions';

export async function GET() {
  try {
    const links = await getAllLinkForUser();
    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch links' },
      { status: 500 }
    );
  }
}
