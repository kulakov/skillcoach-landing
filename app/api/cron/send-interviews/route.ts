import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // TODO: Implement email sending logic
  // 1. Find all participants with status INTERVIEW_SENT who haven't received email
  // 2. Send interview invitation emails with unique chat links
  // 3. Update sent timestamp

  return NextResponse.json({ success: true, message: 'Cron job placeholder' });
}

// Allow GET for Vercel cron
export async function GET(request: NextRequest) {
  return POST(request);
}
