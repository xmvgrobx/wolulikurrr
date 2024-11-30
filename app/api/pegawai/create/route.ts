import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, shift, alamat, jenisKelamin } = body;

    // Validate required fields
    if (!name || !email || !phone || !shift || !alamat || !jenisKelamin) {
      return NextResponse.json({ error: 'Data tidak lengkap!' }, { status: 400 });
    }

    // Validate jenisKelamin enum value (should be either 'LAKI_LAKI' or 'PEREMPUAN')
    if (!['LAKI_LAKI', 'PEREMPUAN'].includes(jenisKelamin)) {
      return NextResponse.json({ error: 'Jenis Kelamin tidak valid!' }, { status: 400 });
    }

    // Create pegawai in the database
    const pg = await prisma.pegawai.create({
      data: {
        name,
        email,
        phone,
        shift,
        alamat,
        jenisKelamin, // This matches the enum in Prisma schema
      },
    });

    return NextResponse.json(
      { 
        message: 'Pegawai berhasil dibuat.',
        pg 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saat membuat pegawai:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat pegawai.' },
      { status: 500 }
    );
  }
}
