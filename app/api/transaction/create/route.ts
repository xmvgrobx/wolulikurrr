import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      items,
      note,
      paymentMethod,
      cashAmount,
      change,
      referralCode,
    } = body;

    // Fetch referral discount
    let discount = 0;
    if (referralCode) {
      const referral = await prisma.referral.findFirst({
        where: {
          code: referralCode,
          isActive: true,
        },
      });
      if (referral) {
        discount = Number(referral.discount); // Convert Decimal to number
      }
    }

    // Create transaction with all items
    const transaction = await prisma.transaction.create({
      data: {
        paymentMethod,
        cash: cashAmount ? parseFloat(cashAmount) : null,
        change: change ? parseFloat(change) : null,
        note,
        referralCode,
        discount: discount, // Use the converted discount value
        items: {
          create: items.map((item: any) => ({
            menuId: item.id,
            quantity: item.quantity,
            price: Number(item.price), // Convert Decimal to number
          })),
        },
      },
      include: {
        items: {
          include: {
            menu: true,
          },
        },
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Transaction creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}