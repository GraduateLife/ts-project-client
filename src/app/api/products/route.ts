import { createPaginationMeta } from '@/mock/pagination.mock';
import { createManyProducts } from '@/mock/product.mock';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const res = createManyProducts(10);
  return new NextResponse(JSON.stringify({ code: 'suc', data: [...res] }), {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  const schema = await request.json();
  const qs = request.nextUrl.searchParams;
  const limit = Number(qs.get('limit'));
  const page = Number(qs.get('page'));
  const meta = createPaginationMeta(page, limit, 50);
  const res = createManyProducts(meta.currentPageItemCount, schema);

  return new NextResponse(
    JSON.stringify({ code: 'suc', data: [...res], meta }),
    {
      status: 200,
    }
  );
}
