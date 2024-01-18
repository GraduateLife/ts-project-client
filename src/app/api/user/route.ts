import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  return new NextResponse(
    JSON.stringify({
      code: 'suc',
      AccountId: reqBody.AccountId,
      AvatarCode: reqBody.Avatar?.fullCode ?? '',
    }),
    {
      status: 200,
    }
  );
}

export type ResponseTypeUserRegister = {
  code: 'suc' | 'fal';
  AccountId: string;
  AvatarCode: string;
};
