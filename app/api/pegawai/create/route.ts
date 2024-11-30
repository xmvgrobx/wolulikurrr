import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, shift } = body;

    // Validate required fields
    if (!name || !email || !phone || !shift) {
      return NextResponse.json({ error: 'Data tidak lengkap!' }, { status: 400 });
    }

    const pg = await prisma.pegawai.create({
      data: {
        name,
        email,
        phone,
        shift,
      }
    });

    return NextResponse.json({ 
      message: 'Pegawai berhasil dibuat.', 
      pg 
    }, { status: 201 });
  } catch (error) {
    console.error('Error saat membuat pegawai:', error);
    return NextResponse.json({ 
      error: 'Terjadi kesalahan saat membuat pegawai.' 
    }, { status: 500 });
  }
}