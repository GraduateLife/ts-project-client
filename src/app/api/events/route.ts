import { createEvents } from '@/mock/events.mock';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const res = createEvents();
  return new NextResponse(JSON.stringify({ code: 'suc', data: [...res] }), {
    status: 200,
  });
}
