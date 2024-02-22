import { CartItem } from '@/models/product';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export async function POST(req: NextRequest) {
  const cartItems = Object.values(await req.json()) as CartItem[];

  const session = await stripe.checkout.sessions.create({
    submit_type: 'pay',
    mode: 'payment',
    payment_method_types: ['card', 'wechat_pay'],
    payment_method_options: {
      wechat_pay: {
        client: 'web',
      },
    },
    billing_address_collection: 'auto',
    line_items: cartItems.map((item) => {
      return {
        quantity: item.productCount,
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.productName,
            images: item.productImageUrls,
            // quantity: item.productCount,
          },
          unit_amount: item.productSinglePrice * 100,
        },
      };
    }),
    client_reference_id: 'hi i am id',
    success_url: `${req.headers.get('origin')}/payment/?status=success`,
    cancel_url: `${req.headers.get('origin')}/payment/?status=cancel`,
  });
  return new NextResponse(JSON.stringify({ sessionId: session.id }), {
    status: 200,
  });
}
