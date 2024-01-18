import { createManyProducts } from '@/mock/product.mock';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const res = createManyProducts(20);
  return new NextResponse(JSON.stringify({ code: 'suc', data: [...res] }), {
    status: 200,
  });
}
