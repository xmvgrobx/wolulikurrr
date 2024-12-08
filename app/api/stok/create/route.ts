import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, jumlah, harga } = body;

    // Validate required fields
    if (!nama || !jumlah || !harga ) {
      return NextResponse.json({ error: 'Data tidak lengkap!' }, { status: 400 });
    }

    const st = await prisma.stok.create({
      data: {
        nama,
        jumlah,
        harga,

      },
    });

    return NextResponse.json(
      { 
        message: 'Stok berhasil dibuat.',
        st
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saat membuat stok:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat stok.' },
      { status: 500 }
    );
  }
}
