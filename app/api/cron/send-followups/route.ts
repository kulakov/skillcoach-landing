import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // TODO: Implement follow-up logic
  // 1. Find participants who completed interview 3-7 days ago
  // 2. Create follow-up chat session
  // 3. Send follow-up email

  return NextResponse.json({ success: true, message: 'Cron job placeholder' });
}

// Allow GET for Vercel cron
export async function GET(request: NextRequest) {
  return POST(request);
}
