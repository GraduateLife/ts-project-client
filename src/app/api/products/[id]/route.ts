import { createOneProduct } from '@/mock/product.mock';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
  const res = createOneProduct(params.id);
  return new NextResponse(JSON.stringify({ code: 'suc', data: res }), {
    status: 200,
  });
}
