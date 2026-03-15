import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUsername } from '@/modules/profile/actions';

export async function GET() {
  try {
    const profile = await getCurrentUsername();
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
