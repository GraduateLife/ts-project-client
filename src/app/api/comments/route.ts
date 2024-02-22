import { createComments } from '@/mock/comment.mock';
import { SiteComment } from '@/models/comment';
import { NextRequest, NextResponse } from 'next/server';

let created: SiteComment[] = [];

export async function GET(request: NextRequest) {
  if (created.length > 0) {
    return new NextResponse(
      JSON.stringify({ code: 'suc', data: [...created] }),
      {
        status: 200,
      }
    );
  }
  const res = createComments(10);
  created = [...res];
  return new NextResponse(JSON.stringify({ code: 'suc', data: [...res] }), {
    status: 200,
  });
}
