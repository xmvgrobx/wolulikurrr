import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  try {
    const referral = await prisma.referral.findFirst({
      where: {
        code: params.code,
        isActive: true,
      },
    });

    if (!referral) {
      return NextResponse.json({ isValid: false, discount: 0 });
    }

    return NextResponse.json({
      isValid: true,
      discount: referral.discount,
    });
  } catch (error) {
    console.error('Error checking referral code:', error);
    return NextResponse.json(
      { error: 'Failed to check referral' },
      { status: 500 }
    );
  }
}