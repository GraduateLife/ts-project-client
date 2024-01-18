import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return new NextResponse(JSON.stringify({ alive: true }), {
    status: 200,
  });
}

export type ResponseTypeGeneral = {
  code: 'suc' | 'fal';
};
