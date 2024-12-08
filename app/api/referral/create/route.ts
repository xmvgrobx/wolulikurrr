import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, discount } = body;

    // Validate required fields
    if (!code || !discount ) {
      return NextResponse.json({ error: 'Data tidak lengkap!' }, { status: 400 });
    }

    const st = await prisma.referral.create({
      data: {
        code,
        discount,
      
      },
    });

    return NextResponse.json(
      { 
        message: 'Kode berhasil dibuat.',
        st
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saat membuat kode:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat kode.' },
      { status: 500 }
    );
  }
}
